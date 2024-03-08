import { Component, OnInit } from '@angular/core';
import { Visit } from '../../models/visit.model';
import { ApiHttpService } from '../../core/services/api-hhtp.service';

@Component({
  selector: 'app-visit-table',
  templateUrl: './visit-table.component.html',
  styleUrls: ['./visit-table.component.css']
})
export class VisitTableComponent implements OnInit {
  visits: Visit[] = [];
  sortedBy: keyof Visit = 'id';
  sortOrder: number = -1;

  constructor(private apiService: ApiHttpService) {}

  ngOnInit(): void {
    this.getBezoeken();
  }

  getBezoeken() {
    this.apiService.getBezoeken().subscribe((data:any) => {
      this.visits = data.visits.map((visit: Visit) => ({
        ...visit,
        id: new Date(visit.id),
        end_date: new Date(visit.end_date),
        duration: (new Date(visit.end_date).getTime() - new Date(visit.id).getTime()) /(1000 * 60)
      }));
    });
  }

  sortBy(property: keyof Visit) {
    if (this.sortedBy === property) {
      this.sortOrder *= -1;
    } else {
      this.sortOrder = 1;
    }
    this.sortedBy = property;

    this.visits.sort((a, b) => {
      const aValue = a[property];
      const bValue = b[property];
      if (aValue < bValue) return -1 * this.sortOrder;
      if (aValue > bValue) return 1 * this.sortOrder;
      return 0;
    });
  }
}
