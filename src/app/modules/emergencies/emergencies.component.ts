import { Component } from '@angular/core';
import { EmergenciesListComponent } from "../../shared/components/emergencies-list/emergencies-list.component";

@Component({
  selector: 'app-emergencies',
  standalone: true,
  imports: [EmergenciesListComponent],
  templateUrl: './emergencies.component.html',
  styleUrl: './emergencies.component.css'
})
export class EmergenciesComponent {

}
