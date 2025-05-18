import { Component, OnInit } from '@angular/core';
import { UserService, UserDTO } from '../../services/user.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-drop-down',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  templateUrl: './user-drop-down.component.html',
  styleUrls: ['./user-drop-down.component.css']
})
export class UserDropDownComponent implements OnInit {

  allUsers: UserDTO[] = [];
  selectedUsers: UserDTO | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.allUsers = users;
    });
  }
}