import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router ,RouterLink} from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-create-new-user',
 imports: [DialogModule,ReactiveFormsModule, StyleClassModule, ButtonModule, FloatLabelModule, InputTextModule, CheckboxModule],
  templateUrl: './create-new-user.component.html',
  styleUrl: './create-new-user.component.css'
})
export class CreateNewUserComponent {

  private http = inject(HttpClient);
  private authService = inject(AuthService);

   visible = false;
   showModal = false;

    userNormalForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dni: new FormControl(''),
    companyName: new FormControl(''),
    email: new FormControl(),
    isAdmin: new FormControl
   
  })

   constructor(private router: Router) {
     this.initForm();
  }

  private initForm () {
    console.log("entrando")
  }

  open() {
    this.showModal = true;
  }

  showDialog() {
    this.showModal=true;
    this.visible = true;
  }

  /** Opcional: cerrar desde TS */
  hideDialog() {
    this.visible = false;
  }

  onRegister() {
    const formData = this.userNormalForm.value;
    this.visible=false;
    this.showModal=false;

    const payload = {
      name: formData.firstName,
      lastName: formData.lastName,
      dni: formData.dni,
      companyName: formData.companyName,
      email: formData.email,
      isAdmin: formData.isAdmin

    };

    this.http.post('http://localhost:8080/api/userNormal', payload).subscribe({
      next: (res) => {
        console.log('Registro exitoso:', res);
        alert('Usuario normal registrado correctamente');
        this.authService.saveToken(payload.name as string);
 
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        alert('Hubo un error al registrar: ' + err.error.message);
      }
    });
  }


}
