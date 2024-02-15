import { Component, Input } from '@angular/core';
import { Stats } from '../../models/stats.model';
import { Visit } from '../../models/visit.model';
import { ApiHttpService } from 'src/app/core/services/api-hhtp.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  stats: Stats = {  
    last_day_average_time: "",
    last_day_total_time: "",
    last_day_count: 0,
    last_month_average_time: "",
    last_month_total_time: "",
    last_month_count: 0,
    all_time_average_time: "",
    all_time_total_time: "",
    all_time_count: 0 
  };
  visits!: Visit[];
  day_percentage: number = 0;
  month_percentage: number = 0;
  day_average_time_percentage: number = 0;
  month_average_time_percentage: number = 0;
  day_total_time_percentage: number = 0;
  month_total_time_percentage: number = 0;
  isDayPositive: boolean = false;
  isMonthPositive: boolean = false;
  isDayAverageTimePositive: boolean = false;
  isMonthAverageTimePositive: boolean = false;
  isDayTotalTimePositive: boolean = false;
  isMonthTotalTimePositive: boolean = false;

  constructor(private ApiHttpService: ApiHttpService) {}

  ngOnInit() {
    this.getBezoeken();
  }

  

   async getStats() {
    this.ApiHttpService.getStats().subscribe((data: Stats) => {
       this.stats = data;
       console.log(this.stats)
     });
    while (true) {
      if (this.stats.all_time_total_time !== "") {
        this.calculateStats();
        break;
      }
    }
    
  }
  

  getBezoeken() {
    this.ApiHttpService.getBezoeken().subscribe((data: any) => {
      this.visits = data.visits.map((visit: Visit) => ({
        ...visit,
        id: new Date(visit.id),
        end_date: new Date(visit.end_date),
        duration: (new Date(visit.end_date).getTime() - new Date(visit.id).getTime()) / (1000 * 60)
      }));
    });
    this.getStats();
  }


  
  calculateStats() {
    // Calculate percentage increase for the day and month
    // Day
    if (this.stats.last_day_count > 0 && this.stats.last_day_average_time !== "") {
      const lastDayCount = this.stats.last_day_count;
      const lastDayAverageTime = parseFloat(this.stats.last_day_average_time);

      this.day_percentage = parseFloat(((this.visits.length - lastDayCount) / lastDayCount * 100).toFixed(2));
      this.isDayPositive = this.day_percentage >= 0;
      
      this.day_average_time_percentage = parseFloat(((this.calculateAverageTime() - lastDayAverageTime) / lastDayAverageTime * 100).toFixed(2));
      this.isDayAverageTimePositive = this.day_average_time_percentage >= 0;
      
      this.day_total_time_percentage = parseFloat(((this.calculateTotalTime() - parseFloat(this.stats.last_day_total_time)) / parseFloat(this.stats.last_day_total_time) * 100).toFixed(2));
      this.isDayTotalTimePositive = this.day_total_time_percentage >= 0;
    }

    // Month
    if (this.stats.last_month_count > 0 && this.stats.last_month_average_time !== "") {
      const lastMonthCount = this.stats.last_month_count;
      const lastMonthAverageTime = parseFloat(this.stats.last_month_average_time);

      this.month_percentage = parseFloat(((this.visits.length - lastMonthCount) / lastMonthCount * 100).toFixed(2));
      this.isMonthPositive = this.month_percentage >= 0;
      
      this.month_average_time_percentage = parseFloat(((this.calculateAverageTime() - lastMonthAverageTime) / lastMonthAverageTime * 100).toFixed(2));
      this.isMonthAverageTimePositive = this.month_average_time_percentage >= 0;
      
      this.month_total_time_percentage = parseFloat(((this.calculateTotalTime() - parseFloat(this.stats.last_month_total_time)) / parseFloat(this.stats.last_month_total_time) * 100).toFixed(2));
      this.isMonthTotalTimePositive = this.month_total_time_percentage >= 0;
    }

  }


  calculateAverageTime(): number {
    let totalTime = 0;
    this.visits.forEach(visit => {
      totalTime += visit.duration;
    });
    return totalTime / this.visits.length;
  }

  calculateTotalTime(): number {
    let totalTime = 0;
    this.visits.forEach(visit => {
      totalTime += visit.duration;
    });
    return totalTime;
  }

     generateSampleVisits() {
    const currentDate = new Date();
    for (let i = 0; i < 30; i++) {
      const visitDate = new Date(currentDate);
      visitDate.setDate(currentDate.getDate() - i); // Subtract i days from current date

      // Generate a random number of visits for each day (for demonstration purposes)
      const numVisits = Math.floor(Math.random() * 30); // Random number between 1 and 10
      for (let j = 0; j < numVisits; j++) {
        // Generate a random duration for each visit (for demonstration purposes)
        const duration = Math.floor(Math.random() * 5); // Random duration between 1 and 180 minutes
        const endDate = new Date(visitDate);
        endDate.setMinutes(endDate.getMinutes() + duration); // Add duration to visit date

        this.visits.push({
          id: visitDate,
          end_date: endDate,
          duration: duration
        });
      }
    }
  }
}
