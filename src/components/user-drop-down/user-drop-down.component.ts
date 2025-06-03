import { Component, OnInit} from '@angular/core';
import { UserService, UserDTO } from '../../services/user.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-drop-down',
  standalone: true,
  imports: [DropdownModule, FormsModule,],
  templateUrl: './user-drop-down.component.html',
  styleUrls: ['./user-drop-down.component.css']
})
export class UserDropDownComponent implements OnInit {

  @Output() onChange = new EventEmitter<UserDTO> ();
  allUsers: UserDTO[] = [];
  selectedUsers: UserDTO | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.allUsers = users;
    });
  }

  onChanges () {
    this.onChange.emit(this.selectedUsers);
  }
}