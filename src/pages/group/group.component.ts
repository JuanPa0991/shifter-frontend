import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormGroupName } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router ,RouterLink} from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { GroupEventsService } from '../../services/group-events.service';



@Component({
  selector: 'app-group',
  standalone: true,
  imports: [DialogModule, ReactiveFormsModule, InputTextModule, ButtonModule, FloatLabelModule],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent {

  visible = false;
  showModal = false;
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  groupForm = new FormGroup({
    groupName: new FormControl('')
  })

    constructor(private router: Router, private groupEvents: GroupEventsService) {
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
    const formData = this.groupForm.value;
    this.visible = false;
    this.showModal = false;
    const payload = {
      name: formData.groupName,
    };

    this.http.post('http://localhost:8080/api/group', payload).subscribe({
      next: (res) => {
        console.log('Registro exitoso:', res);
        alert('Grupo registrado correctamente');
        this.groupEvents.notifyGroupCreated(); // Notifica a los suscriptores
      },
      error: (err) => {
        console.error('Error en el registro de grupo:', err);
        alert('Hubo un error al registrar grupo: ' + err.error.message);
      }
    });
  } 
}