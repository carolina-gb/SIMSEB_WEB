import { Component, Input, OnChanges } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { ReportStageI } from '../../interfaces/auxiliar.interface';

export interface ReportStage {
  reportStageId: number;
  name: string;
  showName: string;
  createdAt: string; // ISO date
}

interface TimelineStep {
  color: string;
  title: string;
  subtitle: string;
  active: boolean;
}

const STAGES = [
  { name: 'opened', showName: 'Ingresado', color: 'bg-blue-400' },
  { name: 'in_course', showName: 'En curso', color: 'bg-sky-400' },
  { name: 'rejected', showName: 'Rechazado', color: 'bg-red-500' },
  { name: 'approved', showName: 'Aprobado', color: 'bg-green-500' },
];

@Component({
  selector: 'app-tracking-timeline',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './tracking-timeline.component.html',
})
export class TrackingTimelineComponent implements OnChanges {
  @Input() stages: ReportStageI[] = [];

  steps: TimelineStep[] = [];

  ngOnChanges() {
    if (!this.stages || this.stages.length === 0) {
      this.steps = [];
      return;
    }

    // Toma el último estado (el actual)
    const lastStage = this.stages[this.stages.length - 1];
    const currentIndex = STAGES.findIndex((s) => s.name === lastStage.name);

    this.steps = STAGES.map((s, idx) => ({
      color: s.color,
      title: s.showName,
      active: idx <= currentIndex,
      subtitle:
        idx === currentIndex ? this.formatDate(lastStage.createdAt) : '',
    }));
  }

  formatDate(date?: Date): string {
    if (!date) return '';
    return date.toLocaleString('es-EC', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
