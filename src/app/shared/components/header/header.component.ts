import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [],
})
export class HeaderComponent {
  @Output() toggleMenu = new EventEmitter<void>();

  onToggleMenu() {
    this.toggleMenu.emit();
  }
}
