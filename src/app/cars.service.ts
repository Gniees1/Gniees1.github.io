import { Injectable } from '@angular/core';
import { Icars } from './Icars';

@Injectable({
  providedIn: 'root'
})
export class carsService {
  url = 'http://localhost:3000/cars';
  constructor() {}
  async getAllCarsLocation():Promise<Icars[]>{
    const data = await fetch(this.url);
    const cars = (await data.json()) ?? [];
    return new Promise((resolve) =>{
      setTimeout(() => {
        resolve(cars);
      },500);
    });
    
  }
  async getCarsLocationById(id:number): Promise<Icars>{
    const data = await fetch(`${this.url}/${id}`);
    console.log("aqui va el data",data);
    return (await data.json())?? {};
  }

}
