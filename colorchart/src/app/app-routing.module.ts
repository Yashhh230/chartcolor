import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartdisplayComponent } from './chartdisplay/chartdisplay.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'chart-display',
    pathMatch: 'full',
  },
  {
    path: 'chart-display',
    component: ChartdisplayComponent,
   
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
