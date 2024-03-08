import { Component, OnInit, Input } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  faArrowDown = faArrowDown
  faArrowUp = faArrowUp
  @Input()
  get statSubtitle(): string {
    return this._statSubtitle;
  }
  set statSubtitle(statSubtitle: string) {
    this._statSubtitle = statSubtitle === undefined ? "Traffic" : statSubtitle;
  }
  private _statSubtitle = "Traffic";

  @Input()
  get statTitle(): string {
    return this._statTitle;
  }
  set statTitle(statTitle: string) {
    this._statTitle = statTitle === undefined ? "350,897" : statTitle;
  }
  private _statTitle = "350,897";

  // The value must match one of up or down
  @Input()
  get statArrow(): string {
    return this._statArrow;
  }
  set statArrow(statArrow: string) {
    this._statArrow =
      statArrow !== "down" && statArrow !== "up" ? "up" : statArrow;
      if (this._statArrow !== "no" ){
          this._subTitleTher = true
        }


  }

  private _statArrow = "no";

  get subTitleThere(): boolean {
    return this._subTitleTher;
  }

  private _subTitleTher = false;

  @Input()
  get statPercent(): string {
    return this._statPercent;
  }
  set statPercent(statPercent: string) {
    this._statPercent = statPercent === undefined ? "" : statPercent;
  }
  private _statPercent = "";

  // can be any of the text color utilities
  // from tailwindcss
  @Input()
  get statPercentColor(): string {
    return this._statPercentColor;
  }
  set statPercentColor(statPercentColor: boolean) {
    this._statPercentColor =
      statPercentColor ? "text-emerald-500" : "text-red-500";
  }
  private _statPercentColor = "text-emerald-500";

  @Input()
  get statDescripiron(): string {
    return this._statDescripiron;
  }
  set statDescripiron(statDescripiron: string) {
    this._statDescripiron =
      statDescripiron === undefined ? "" : statDescripiron;
  }
  private _statDescripiron = "";

  @Input()
  get statIconName(): string {
    return this._statIconName;
  }
  set statIconName(statIconName: string) {
    this._statIconName =
      statIconName === undefined ? "far fa-chart-bar" : statIconName;
  }
  private _statIconName = "far fa-chart-bar";

  // can be any of the background color utilities
  // from tailwindcss
  @Input()
  get statIconColor(): string {
    return this._statIconColor;
  }
  set statIconColor(statIconColor: string) {
    this._statIconColor =
      statIconColor === undefined ? "" : statIconColor;
  }
  private _statIconColor = "bg-red-500";

  constructor() {}

  ngOnInit(): void {}
}
