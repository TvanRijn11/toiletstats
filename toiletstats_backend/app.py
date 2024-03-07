
import psycopg2
from flask import (Flask, request, jsonify)
from datetime import datetime, timedelta

app = Flask(__name__)


def get_db_connection():
    conn = psycopg2.connect(host='ep-lucky-band-a2jgohfs.eu-central-1.aws.neon.tech',
                            database='Toiletstats',
                            user='toilet',
                            password='urnLZ2N3ezti')
    return conn


@app.route('/record_visit', methods=['POST'])
def record_visit():
    conn = get_db_connection()
    cur = conn.cursor()

    # Check the latest record in the visits table
    cur.execute('SELECT end_date FROM visits ORDER BY end_date DESC LIMIT 1;')
    latest_end_date = cur.fetchone()
    now = datetime.now()
    now_date = now.strftime('%Y-%m-%d %H:%M:%S')

    if latest_end_date:
        # If there is a latest record, check the time difference
        latest_end_date = latest_end_date[0].strftime('%Y-%m-%d %H:%M:%S')
        # print("new entry: " + latest_date + " latest date: " + latest_end_date)
        latest_time = datetime.strptime(latest_end_date, '%Y-%m-%d %H:%M:%S')

        time_difference = now - latest_time

        if time_difference.total_seconds() <= 5:
            print(time_difference.total_seconds())
            print("NOW: " + now_date)
            print("LATEST: " + latest_end_date)
            # If time difference is less than or equal to 5 seconds, update latest_date
            cur.execute('UPDATE visits SET end_date = %s WHERE end_date = %s;', (now_date, latest_end_date))
            conn.commit()
            return jsonify({'message': 'Visit updated successfully', 'latest_date': now_date})
    
    # If no latest record or time difference > 5 seconds, insert a new record
    print("new insert")
    now_minus = (datetime.now() - timedelta(seconds=10)).strftime('%Y-%m-%d %H:%M:%S')
    cur.execute('INSERT INTO visits (id, end_date) VALUES (%s, %s);', (now_minus, now_date))
    conn.commit()
    return jsonify({'message': 'Visit recorded successfully', 'start': now_minus, 'end': now_date})




@app.route('/get_all_visits', methods=['GET'])
def get_all_visits():
    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute('SELECT * FROM visits ORDER BY id DESC;')
        rows = cur.fetchall()

        visits_data = []
        for row in rows:
            visit = {
                'id': row[0].strftime('%Y-%m-%d %H:%M:%S'),
                'end_date': row[1].strftime('%Y-%m-%d %H:%M:%S')
            }
            visits_data.append(visit)

        return jsonify({'visits': visits_data})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cur.close()
        conn.close()



def calculate_average_and_total_time(visits):
    if not visits:
        return "0", "0", 0

    total_time = timedelta()

    for visit in visits:
        id_time = datetime.strptime(visit['id'], '%Y-%m-%d %H:%M:%S')
        end_time = datetime.strptime(visit['end_date'], '%Y-%m-%d %H:%M:%S')

        total_time += end_time - id_time

    # Calculate average and total time in minutes and round to 2 decimals
    average_time_minutes = round(total_time.total_seconds() / len(visits) / 60, 2)
    total_time_minutes = round(total_time.total_seconds() / 60, 2)

    return str(average_time_minutes), str(total_time_minutes), len(visits)

@app.route('/get_stats', methods=['GET'])
def get_stats():
    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute('SELECT * FROM visits;')
        rows = cur.fetchall()

        visits_data = []
        for row in rows:
            visit = {
                'id': row[0].strftime('%Y-%m-%d %H:%M:%S'),
                'end_date': row[1].strftime('%Y-%m-%d %H:%M:%S')
            }
            visits_data.append(visit)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cur.close()
        conn.close()

    now = datetime.now()

    last_day_start = datetime(now.year, now.month, now.day)
    last_day_end = now

    last_day_visits = [visit for visit in visits_data if last_day_start <= datetime.strptime(visit['id'], '%Y-%m-%d %H:%M:%S') <= last_day_end]
    last_month_visits = [visit for visit in visits_data if (now - timedelta(days=30)) <= datetime.strptime(visit['id'], '%Y-%m-%d %H:%M:%S') <= now]
    all_time_average_time, all_time_total_time, all_time_count = calculate_average_and_total_time(visits_data)
    last_day_average_time, last_day_total_time, last_day_count = calculate_average_and_total_time(last_day_visits)
    last_month_average_time, last_month_total_time, last_month_count = calculate_average_and_total_time(last_month_visits)

    return jsonify({
        'last_day_average_time': last_day_average_time,
        'last_day_total_time': last_day_total_time,
        'last_day_count': last_day_count,
        'last_month_average_time': last_month_average_time,
        'last_month_total_time': last_month_total_time,
        'last_month_count': last_month_count,
        'all_time_average_time': all_time_average_time,
        'all_time_total_time': all_time_total_time,
        'all_time_count': all_time_count
    })

if __name__ == '__main__':
    app.run()
