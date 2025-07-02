import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  imports: [RouterModule, NgIf, HeaderComponent, SidebarComponent],
})
export class LayoutComponent {
  isSidebarOpen = false;

  toggleSidebar(open?: boolean) {
    this.isSidebarOpen = open !== undefined ? open : !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }
}
