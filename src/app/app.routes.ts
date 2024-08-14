import { Routes } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
    {path:'', component: CarsComponent},
    {path:'details/:id', component:DetailsComponent, title: 'Details'}
];
 