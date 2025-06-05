import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormGroupName, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router ,RouterLink} from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { GroupService } from '../../services/group.service';



@Component({
  selector: 'app-group',
  standalone: true,
  imports: [DialogModule, ReactiveFormsModule, InputTextModule, ButtonModule, FloatLabelModule, FormsModule],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent {

  visible = false;
  showModal = false;
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private groupService: GroupService;

  groupForm = new FormGroup({
    groupName: new FormControl('')
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
    const formData = this.groupForm.value;
    this.visible=false;
    this.showModal=false;
    const payload = {
      name: formData.groupName,
    };

  this.groupService.registrarGrupo(payload).subscribe({
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