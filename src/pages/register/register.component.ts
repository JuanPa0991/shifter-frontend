import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { LogoComponent } from '../../components/logo/logo.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, LogoComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent { 

  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dni: new FormControl(''),
    companyName: new FormControl(''),
    password: new FormControl(),
    confirmPassword: new FormControl(),
    email: new FormControl(),
    comfirmEmail: new FormControl()
    
  })

  constructor() {
     this.initForm();
  }

  private initForm () {
    console.log("entrando")
  }
}