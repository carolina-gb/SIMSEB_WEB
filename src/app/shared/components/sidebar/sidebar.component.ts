import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [NgClass],
})
export class SidebarComponent {
  @Input() open = false;
  @Output() closeSidebar = new EventEmitter<void>();
}
