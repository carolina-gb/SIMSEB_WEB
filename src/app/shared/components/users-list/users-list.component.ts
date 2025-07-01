import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  users = [
    {
      nIdentification: '0951553049',
      userName: 'eramirez',
      completeName: 'Edinson Ramirez Rios',
      email: 'eramirez@gmail.com',
      status: 'Inactivo',
      details: '',
    },
    {
      nIdentification: '0951553048',
      userName: 'cgonzalez',
      completeName: 'Carolina González Bernabé',
      email: 'cgonzalez@gmail.com',
      status: 'Activo',
      details: '',
    },
    {
      nIdentification: '0951553047',
      userName: 'eramirez',
      completeName: 'Edinson Ramirez Rios',
      email: 'eramirez@gmail.com',
      status: 'Pendiente',
      details: '',
    },
  ];

  userPage = 1;
  userPageSize = 5;

  get pagedUsers() {
    const start = (this.userPage - 1) * this.userPageSize;
    return this.users.slice(start, start + this.userPageSize);
  }
  get userTotalPages() {
    return Math.ceil(this.users.length / this.userPageSize);
  }
  changeUserPage(newPage: number) {
    if (newPage < 1 || newPage > this.userTotalPages) return;
    this.userPage = newPage;
  }

  // Ejemplo getStatusClass:
  getStatusClass(status: string) {
    switch (status) {
      case 'Activo':
        return 'bg-green-100 text-green-600';
      case 'Inactivo':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
}
