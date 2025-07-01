import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-infractions-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './infractions-list.component.html',
  styleUrl: './infractions-list.component.css',
})
export class InfractionsListComponent {
  infractions = [
    {
      code: 'INFR-001',
      user: 'Gabrielym',
      type: 'Falsa alarma de robo en vía publica',
      date: '2025-05-10',
      dateSupend: '3',
    },
    {
      code: 'INFR-002',
      user: 'Angienb',
      type: 'Falsa alarma de robo en vivienda',
      date: '2025-05-10',
      dateSupend: '2',
    },
    {
      code: 'INFR-003',
      user: 'Karenmg',
      type: 'Falsa alarma de robo en vía publica',
      date: '2025-05-10',
      dateSupend: '4',
    },
  ];
}
