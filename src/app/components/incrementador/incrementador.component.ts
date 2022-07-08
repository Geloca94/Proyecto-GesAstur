import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }

  // @Input() progreso: number = 0;
  @Input('valor') progreso: number = 0;
  @Input() btnClass: string = 'btn-primary';

  @Output('valor') valorEmitter: EventEmitter<number> = new EventEmitter();

  enviarValor(valor: number) {

    if (this.progreso >= 100 && valor >= 0) {
      this.valorEmitter.emit(100);
      this.progreso = 100;
      return
    }
    if (this.progreso <= 0 && valor < 0) {
      this.valorEmitter.emit(0);
      this.progreso = 0;
      return
    }
    this.progreso = this.progreso + valor;
    this.valorEmitter.emit(this.progreso);

  }

  onChange(nuevoValor: number) {

    if (nuevoValor >= 100) {
      this.progreso = 100;
    } else if (nuevoValor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }

    this.valorEmitter.emit(this.progreso);
  }
}
