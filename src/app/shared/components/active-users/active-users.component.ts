// active-users.component.ts
import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-active-users',
    templateUrl: './active-users.component.html',
    imports: [NgFor]
})
export class ActiveUsersComponent {
  @Input() users: Array<{ name: string; reports: number }> = [
    { name: 'Gabrielym', reports: 10 },
    { name: 'Angienb', reports: 6 },
    { name: 'Karenmg', reports: 9 },
    { name: 'Dennymg', reports: 11 }
  ];
}
