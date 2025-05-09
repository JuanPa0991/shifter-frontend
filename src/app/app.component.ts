import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "../pages/login/login.component";
import { RegisterComponent } from '../pages/register/register.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, RegisterComponent],  // Asegúrate de que ambos componentes estén aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Ten en cuenta que la propiedad se llama "styleUrls" (en plural)
})
export class AppComponent {
  title = 'shift_planner-frontend';
}