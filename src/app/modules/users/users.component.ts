import { Component } from '@angular/core';
import { UsersListComponent } from '../../shared/components/users-list/users-list.component';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UsersListComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {}
