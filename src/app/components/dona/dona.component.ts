import { Component, Input } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {
  @Input() title: string = "Sin Titulo";


  public doughnutChartLabels: string[] = ['Comida', 'Bebida', 'Gastos de Gestiones'];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [350, 450, 100] },
    ]
  };


  public doughnutChartType: ChartType = 'doughnut';
}
