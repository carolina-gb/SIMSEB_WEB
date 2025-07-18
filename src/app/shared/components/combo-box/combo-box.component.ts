// combo-box.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/services';
import { FormsModule } from '@angular/forms';
import { UserI } from '../../interfaces/user.interface';

@Component({
  selector: 'app-combo-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative w-full max-w-md">
      <input
        type="text"
        [(ngModel)]="search"
        (ngModelChange)="onSearchChange($event)"
        placeholder="Buscar usuario por nombre, o usuario..."
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ul
        *ngIf="dropdownOpen"
        class="absolute bg-white border w-full z-10 mt-1 rounded-xl max-h-64 overflow-auto shadow-lg"
      >
        <li
          *ngFor="let user of users"
          (click)="selectUser(user)"
          class="cursor-pointer px-4 py-2 hover:bg-blue-100 rounded-lg transition"
        >
         {{ user.fullName }} <b>username:</b> {{user.username}}
        </li>
        <li
          *ngIf="!loading && users.length === 0"
          class="px-4 py-2 text-gray-400"
        >
          No hay resultados
        </li>
        <li *ngIf="loading" class="px-4 py-2 text-blue-500">Cargando...</li>
      </ul>
    </div>
  `,
})
export class ComboBoxComponent implements OnInit {
  @Input() minLength = 3;
  @Output() userSelected = new EventEmitter<UserI>();

  users: UserI[] = [];
  search = '';
  loading = false;
  dropdownOpen = false;
  private searchTimeout: any;

  constructor(private services: ApiService) {}

  ngOnInit() {
    this.getAllUsers();
  }

  async getAllUsers() {
    this.loading = true;
    this.dropdownOpen = false;
    try {
      const resp = await this.services.getUserList();
      this.users = resp?.data?.data ?? [];
    } catch (e) {
      this.users = [];
    } finally {
      this.loading = false;
    }
  }

  onSearchChange(value: string) {
    clearTimeout(this.searchTimeout);
    if (value.length >= this.minLength) {
      this.loading = true;
      this.dropdownOpen = true;
      this.searchTimeout = setTimeout(async () => {
        try {
          const resp = await this.services.searchUserByFilter(value); // El nombre real del método de búsqueda
          this.users = resp?.data?.data ?? [];
        } catch (e) {
          this.users = [];
        } finally {
          this.loading = false;
        }
      }, 400);
    } else if (value.length === 0) {
      this.getAllUsers();
    } else {
      this.users = [];
      this.dropdownOpen = false;
    }
  }

  selectUser(user: UserI) {
    this.userSelected.emit(user);
    this.search = user.username;
    this.dropdownOpen = false;
  }
}
