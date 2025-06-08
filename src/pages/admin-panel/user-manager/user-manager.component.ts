import { Component } from '@angular/core';

@Component({
  selector: 'app-user-manager',
  imports: [],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.css'
})
export class UserManagerComponent {

   visible = false;
   showModal = false;

    showDialog() {
    this.showModal=true;
    this.visible = true;
  }

}
