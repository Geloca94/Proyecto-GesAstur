import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { map, Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public tituloSubs$!: Subscription;
  public titulo!: string;

  constructor(private router: Router) {

    this.tituloSubs$ = this.getArgumentosRuta().subscribe((data) => {
      if (data) {
        this.titulo = data['titulo'];
        document.title = `AdminPro - ${this.titulo}`;
      }

    });

  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }
  getArgumentosRuta() {
    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: any) => event.snapshot.firstChild === null),
        map(event => event.snapshot.data)
      );
  }
}


