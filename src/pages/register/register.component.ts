import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { LogoComponent } from '../../components/logo/logo.component';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, LogoComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent { 

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dni: new FormControl(''),
    companyName: new FormControl(''),
    password: new FormControl(),
    confirmPassword: new FormControl(),
    email: new FormControl(),
    confirmEmail: new FormControl()
    
  })

  constructor(private router: Router) {
     this.initForm();
  }

  private initForm () {
    console.log("entrando")
  }

  onRegister() {
    const formData = this.registerForm.value;

    const payload = {
      name: formData.firstName,
      lastName: formData.lastName,
      dni: formData.dni,
      companyName: formData.companyName,
      email: formData.email,
      password: formData.password
    };

    this.http.post('http://localhost:8080/api/register', payload).subscribe({
      next: (res) => {
        console.log('Registro exitoso:', res);
        alert('Usuario registrado correctamente');
        this.authService.saveToken(payload.name as string);
        this.router.navigate(['/adminpannel']);
 
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        alert('Hubo un error al registrar: ' + err.error.message);
      }
    });
  }
}