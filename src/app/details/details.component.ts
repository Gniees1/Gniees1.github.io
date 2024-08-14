import { Component, inject } from '@angular/core';
import { Icars } from '../Icars';
import { carsService } from '../cars.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validator, Validators} from '@angular/forms';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <section class="card">
    <div class="card-image">
      <img [src]="carsLocation?.img" alt="Car Image">
    </div>
    <h2>{{ carsLocation?.name }}</h2>
    <p>
      {{ carsLocation?.Marca }} - {{ carsLocation?.Precio }}
    </p>
  </section>
  <section class="form-apply">
  <h2 class="heading-form">Consultanos por financiación y ofertas!</h2>
  <form [formGroup]="applyForm" (submit)="handleSubmit()">
    <div class="form-group">
      <label for="Nombre">Nombre</label>
      <input type="text" id="Nombre" formControlName="Nombre">
      <span class="alert" [hidden]="Nombre.valid || Nombre.untouched">
        @if(Nombre.errors?.['required']) { Nombre es requerido }
        @else { Debe ingresar un Nombre válido }
      </span>
    </div>

    <div class="form-group">
      <label for="Apellido">Apellido</label>
      <input type="text" id="Apellido" formControlName="Apellido">
      <span class="alert" [hidden]="Apellido.valid || Apellido.untouched">
        @if(Apellido.errors?.['required']) { Apellido es requerido }
        @else { Debe ingresar un Apellido válido }
      </span>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input type="text" id="email" formControlName="email">
      <span class="alert" [hidden]="email.valid || email.untouched">
        @if(email.errors?.['required']) { Email es requerido }
        @else { Debe ingresar un Email válido }
      </span>
    </div>

    <button type="submit" class="btnSubmit" [disabled]="applyForm.invalid">Contactar</button>
  </form>
</section>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  carsService = inject(carsService);
  carsLocation: Icars | undefined;
  applyForm = new FormGroup({
    Nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[a-zA-Z\s]{3,15}$')]),
    Apellido: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern("^[a-zA-Z\s']{3,30}$")]),
    email: new FormControl('', [Validators.required, Validators.pattern(
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    )])
  });
  constructor(){
    console.log(carsService);
    const carsLocationId = Number(this.route.snapshot.params['id']);
    console.log(carsLocationId);
    console.log(this.carsLocation);
    this.carsService.getCarsLocationById(carsLocationId).then((carsLocation)=>{
      this.carsLocation = carsLocation;
      console.log('Cars Location:', this.carsLocation); 
    });
  }
  get Nombre(){
    return this.applyForm.get('Nombre') as FormControl;
  }
  get Apellido(){
    return this.applyForm.get('Apellido') as FormControl;
  }
  get email(){
    return this.applyForm.get('email') as FormControl;
  }
  handleSubmit(){
    if(this.applyForm.invalid) return;
    alert('Datos enviados con exito');
  };
}




