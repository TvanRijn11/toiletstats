export class BezoekerExtra {
    totalTime: number;
    monthTime: number;
    weekTime: number;
    avgTotalTime: number;
    avgMonthTime: number;
    avgWeekTime: number;
    visitsTotal: number;
    visitsMonth: number;
    visitsWeek: number;

    constructor(totalTime: number, monthTime: number, weekTime: number, avgTotalTime: number, avgMonthTime: number, avgWeekTime: number, visitsTotal: number, visitsMonth: number, visitsWeek: number) {
        this.totalTime = totalTime;
        this.monthTime = monthTime;
        this.weekTime = weekTime;
        this.avgTotalTime = avgTotalTime;
        this.avgMonthTime = avgMonthTime;
        this.avgWeekTime = avgWeekTime;
        this.visitsTotal = visitsTotal;
        this.visitsMonth = visitsMonth;
        this.visitsWeek = visitsWeek;
    }
}