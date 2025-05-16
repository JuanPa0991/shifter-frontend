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



@Component({
  selector: 'app-group',
  standalone: true,
  imports: [DialogModule, ReactiveFormsModule, InputTextModule, ButtonModule, FloatLabelModule],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  groupForm = new FormGroup({
    groupName: new FormControl('')
  })

    constructor(private router: Router) {
     this.initForm();
  }

  private initForm () {
    console.log("entrando")
  }

  onRegister() {
    const formData = this.groupForm.value;

    const payload = {
      name: formData.groupName,
    };

    this.http.post('http://localhost:8080/api/group', payload).subscribe({
      next: (res) => {
        console.log('Registro exitoso:', res);
        alert('Grupo registrado correctamente');
        this.authService.saveToken(payload.name as string);
        this.router.navigate(['/adminpannel']);
 
      },
      error: (err) => {
        console.error('Error en el registro de grupo:', err);
        alert('Hubo un error al registrar grupo: ' + err.error.message);
      }
    });
  } 
}