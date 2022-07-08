import { Component } from '@angular/core';

@Component({
  selector: 'app-progess',
  templateUrl: './progess.component.html',
  styleUrls: ['./progess.component.css',
  ]
})
export class ProgessComponent {

  progreso1: number = 25;
  progreso2: number = 45;

  get getProgreso1() {
    return `${this.progreso1}%`;
  }

  get getProgreso2() {
    return `${this.progreso2}%`;


  }


}
