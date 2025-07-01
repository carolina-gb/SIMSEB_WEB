import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

type AlertType = 'success' | 'error' | 'info' | 'warning';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './alert-modal.component.html',
})
export class AlertModalComponent {
  @Input() open = false;
  @Input() type: AlertType = 'info';
  @Input() title: string = '';
  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();

  cerrar() {
    this.close.emit();
  }

  get styles() {
    switch (this.type) {
      case 'success':
        return {
          icon: 'text-green-500',
          bg: 'bg-green-100',
          border: 'border-green-400',
        };
      case 'error':
        return {
          icon: 'text-red-500',
          bg: 'bg-red-100',
          border: 'border-red-400',
        };
      case 'warning':
        return {
          icon: 'text-yellow-500',
          bg: 'bg-yellow-100',
          border: 'border-yellow-400',
        };
      default:
        return {
          icon: 'text-blue-500',
          bg: 'bg-blue-100',
          border: 'border-blue-400',
        };
    }
  }

  get iconSvg() {
    switch (this.type) {
      case 'success': // check
        return `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5 13l4 4L19 7" />
        </svg>`;
      case 'error': // x
        return `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M6 18L18 6M6 6l12 12" />
        </svg>`;
      case 'warning': // !
        return `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 9v2m0 4h.01M12 5.5C7.305 5.5 3.5 9.305 3.5 14S7.305 22.5 12 22.5 20.5 18.695 20.5 14 16.695 5.5 12 5.5z" />
        </svg>`;
      default: // info
        return `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M12 3a9 9 0 110 18 9 9 0 010-18z" />
        </svg>`;
    }
  }
}
