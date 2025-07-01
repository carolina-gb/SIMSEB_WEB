// emergencies.component.ts
import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-emergencies',
    standalone: true,
    templateUrl: './emergenciesWidget.component.html',
    imports: [NgFor]
})
export class EmergenciesWidgetComponent {
  @Input() emergencies: Array<{ code: string; user: string }> = [
    { code: 'EME-001', user: 'Ligia León' },
    { code: 'EME-002', user: 'Ronald Neira' },
    { code: 'EME-003', user: 'Allan González' },
    { code: 'EME-004', user: 'Carmela Carabajo' }
  ];
}
