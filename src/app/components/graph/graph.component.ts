import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Visit } from "../../models/visit.model";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnChanges {
  @Input() visits!: Visit[]; // Assuming visits array is populated

  constructor() {
    Chart.register(...registerables);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visits'].currentValue) {
        this.visits = this.visits
    }
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const daysInMonth = new Date(currentDate.getFullYear(), currentMonth, 0).getDate();

    const visitsThisMonth = this.visits.filter(visit =>
      (new Date(visit.id).getMonth() + 1) === currentMonth
    );

    const visitsPerDay = new Array(daysInMonth).fill(0);

    visitsThisMonth.forEach(visit => {
      const dayOfMonth = new Date(visit.id).getDate();
      visitsPerDay[dayOfMonth - 1]++;
    });
    let ctx: any = document.getElementById("visit-chart") as HTMLCanvasElement;
    ctx = ctx.getContext("2d");

      var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'white');   
    gradient.addColorStop(1, '#ffcfe8');

    // Chart configuration
    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
        datasets: [{
          label: 'Visits',
          data: visitsPerDay,
          backgroundColor: gradient, // Using the gradient for background color
          borderColor: 'white',
          borderWidth: 3,
          fill: {
            target: 'origin', // Fill area under the line from the origin
            above: gradient, // Fill color above the line with gradient
            below: 'rgba(255, 255, 255, 0)', // Fill color below the line as transparent
          },
          cubicInterpolationMode: 'monotone',
          pointRadius: 0.1
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        color: 'white',
        interaction: {
          mode: 'nearest'
        },
        scales: {
          x: {
            grid: {
              color: 'transparent'
            },
            ticks: {
              color: 'white'
            },
            display: true,
            title: {
              display: true,
              color: 'white',
              text: 'Day of the Month'
            }
          },
          y: {
            grid: {
              color: 'transparent'
            },
            ticks: {
              color: 'white'
            },
            display: true,
            title: {
              color: 'white',
              display: true,
              text: 'Number of Visits'
            }
          }
        }
      }
    };

    // Create chart
    new Chart(ctx, config);
  }
}
