import { Component } from '@angular/core';
import { InfractionsListComponent } from "../../shared/components/infractions-list/infractions-list.component";

@Component({
  selector: 'app-infractions',
  standalone: true,
  imports: [InfractionsListComponent],
  templateUrl: './infractions.component.html',
  styleUrl: './infractions.component.css',
})
export class InfractionsComponent {}
