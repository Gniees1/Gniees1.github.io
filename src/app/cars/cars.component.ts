import { Component, inject} from '@angular/core';
import { CarsLocationComponent } from '../cars-location/cars-location.component';
import { Icars } from '../Icars';
import { carsService } from '../cars.service';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CarsLocationComponent],
  template: `
  <section>
    <form>
      <input type="search" placeholder="Filtrar por Marca" #filter>
      <button type="button" (click)="filterResults(filter.value)">Buscar</button>
    </form>
  </section>
  <section>
    @if(!carsList.length){
      <span>Loading...</span>
    }
    @for(car of filteredCarsList; track car.id){
      <app-cars-location [carsLocation]="car"/>
    }
  </section>
  `,
  styleUrl: './cars.component.css'
})
export class CarsComponent {
carsService: carsService = inject(carsService);
carsList: Icars[] = [];
filteredCarsList: Icars[] = [];
  constructor(){
    this.carsService.getAllCarsLocation().then((carsList: Icars[]) =>{
      this.carsList = carsList;
      this.filteredCarsList = carsList;
    })
  }
  filterResults(text:string){
    if(!text) {
      this.filteredCarsList = this.carsList;
    }
    this.filteredCarsList = this.carsList.filter((car)=> car?.Marca.toLowerCase().includes(text.toLowerCase()));
  }
}
