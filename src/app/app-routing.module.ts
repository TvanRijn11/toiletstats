import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VisitTableComponent } from './components/visit-table/visit-table.component';
import { GraphComponent } from './components/graph/graph.component';

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent},
  { path: "bezoeken", component: VisitTableComponent},
  { path: "graph", component: GraphComponent},
  { path: "", redirectTo: "dashboard", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
