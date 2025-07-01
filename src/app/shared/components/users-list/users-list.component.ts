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

  getStatusClass(status: string) {
    switch (status) {
      case 'Pendiente':
        return 'bg-gray-100 text-gray-700';
      case 'Inactivo':
        return 'bg-gray-100 text-red-500';
      case 'Activo':
        return 'bg-gray-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
}
