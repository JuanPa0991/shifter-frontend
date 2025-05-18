import { Component, OnInit } from '@angular/core';
import { GroupService, GroupDTO } from '../../services/group.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-drop-down-groups',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  templateUrl: './drop-down-groups.component.html',
  styleUrls: ['./drop-down-groups.component.css']
})
export class DropDownGroupsComponent implements OnInit {

  allGroups: GroupDTO[] = [];
  selectedGroup: GroupDTO | undefined;

  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.groupService.getGroups().subscribe(groups => {
      this.allGroups = groups;
    });
  }
}