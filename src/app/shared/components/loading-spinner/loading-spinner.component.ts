import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [NgIf],
  template: `
    <div *ngIf="show" class="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70">
  <div class="flex flex-col items-center bg-white bg-opacity-80 rounded-xl shadow-xl p-8 animate-fade-in">
    <svg
      class="animate-spin h-16 w-16 text-blue-600 mb-4 drop-shadow-lg"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-100" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="5"></circle>
      <path class="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
    </svg>
    <span class="text-blue-800 text-lg font-bold tracking-wide drop-shadow">
      Procesando...
    </span>
  </div>
</div>
  `,
})
export class LoadingSpinnerComponent {
  @Input() show = false;
}
