import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
  <main>
    <header>
      <img src="https://png.pngtree.com/png-vector/20220711/ourmid/pngtree-automotive-car-logo-png-image_5837187.png" alt="logo" aria-hidden="true" />
      <h2 routerLink="/">Inicio</h2>
    </header>
    <router-outlet></router-outlet>.
  </main>
  
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Proyecto_Angular';
}
