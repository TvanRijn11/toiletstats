import { Component, OnInit } from '@angular/core';
import { faBars, faTimes, faGauge, faTable, faArrowLeft, faLeftLong } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  collapseShow = "hidden";
  collapseSmall = false;
  constructor() {}
  faTable = faTable
  faGauge = faGauge
  faBars = faBars
  faTimes = faTimes
  faLeft = faArrowLeft
  ngOnInit() {}
  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }

  toggleCollapseSmall(): void {
    this.collapseSmall = !this.collapseSmall;
  }
}
