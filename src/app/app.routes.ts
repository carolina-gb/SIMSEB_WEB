import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
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
    children: [
      { path: 'dashboard', component: DashboardComponent },
      // más rutas privadas
    ],
  },

  // Ruta comodín (opcional: para 404)
  // { path: '**', redirectTo: 'login' }
];
