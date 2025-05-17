
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormGroupName } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-turn',
  imports: [DialogModule, ReactiveFormsModule, InputTextModule, ButtonModule, FloatLabelModule],
  templateUrl: './turn.component.html',
  styleUrl: './turn.component.css'
})
export class TurnComponent {
  visible = false;
  showModal = false;
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  turnForm = new FormGroup({
    initDate: new FormControl(''),
    endDate: new FormControl(''),
    userName: new FormControl(''),
    initHour: new FormControl(''),
    endHour: new FormControl(),
    userId: new FormControl(),
    groupId: new FormControl()
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
    this.open();
    this.visible = true;
  }

  /** Opcional: cerrar desde TS */
  hideDialog() {
    this.visible = false;
  }

  onRegister() {
    const formData = this.turnForm.value;
    this.visible=false;
    this.showModal=false;
    const payload = {
      initDate: formData.initDate,
      endDate: formData.endDate,
      userName: formData.userName,
      initHour: formData.initHour,
      endHour: formData.endHour,
      userId: formData.userId,
      groupId: formData.groupId
    };

    this.http.post('http://localhost:8080/api/turn', payload).subscribe({
      next: (res) => {
        console.log('Registro exitoso:', res);
        alert('Grupo registrado correctamente');
        
        
 
      },
      error: (err) => {
        console.error('Error en el registro de grupo:', err);
        alert('Hubo un error al registrar grupo: ' + err.error.message);
      }
    });
  } 
}
