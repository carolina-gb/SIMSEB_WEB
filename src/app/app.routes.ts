import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { ReportsComponent } from './modules/reports/reports.component';
import { InfractionsComponent } from './modules/infractions/infractions.component';
import { EmergenciesComponent } from './modules/emergencies/emergencies.component';
import { UsersComponent } from './modules/users/users.component';
import { ReportDetailsComponent } from './modules/report-details/report-details.component';
import { UserDetailsComponent } from './modules/user-details/user-details.component';
import { AuthTypeGuard } from './shared/guards/auth.guard';
import { ReporteriaComponent } from './shared/components/reporting/reporting.component';
// ...otros componentes

export const routes: Routes = [
  // Redirección por defecto: root => login
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  // Rutas públicas (login, registro)
  { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },

  // Rutas privadas (dashboard y otras bajo layout)
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [AuthTypeGuard],
    children: [
      // { path: 'dashboard', component: DashboardComponent },
      { path: 'emergencies', component: EmergenciesComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'infractions', component: InfractionsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'reports/:id', component: ReportDetailsComponent },
      { path: 'users/:userId', component: UserDetailsComponent },
      { path: 'reporting', component: ReporteriaComponent },

      // más rutas privadas
    ],
  },
];
