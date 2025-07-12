// tracking-timeline.component.ts
import { Component, Input } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';

export interface TimelineStep {
  color: string; // bg-blue-400 | bg-red-500 | …
  title: string; // Texto que se ve a la derecha
  subtitle?: string; // Fecha u observación (opcional)
  active: boolean; // Para atenuar pasos futuros si lo necesitas
}

@Component({
  selector: 'app-tracking-timeline',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './tracking-timeline.component.html',
})
export class TrackingTimelineComponent {
  /** El padre enviará directamente los pasos que desea mostrar */
  @Input() steps: TimelineStep[] = [];
}
