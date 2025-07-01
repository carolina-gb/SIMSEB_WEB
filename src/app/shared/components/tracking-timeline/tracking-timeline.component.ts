import { Component, Input } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';

export interface TrackingStep {
  color: string; // Ej: 'bg-blue-400', 'bg-red-500', etc.
  title: string; // Ej: 'Creado el'
  subtitle?: string; // Ej: '2025-05-15' o texto adicional
}

@Component({
  selector: 'app-tracking-timeline',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './tracking-timeline.component.html',
})
export class TrackingTimelineComponent {
  @Input() steps: TrackingStep[] = [];
}
