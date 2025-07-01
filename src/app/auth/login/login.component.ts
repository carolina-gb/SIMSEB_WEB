import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login', // 🔥 ESTA ES LA CLAVE
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [FormsModule, CommonModule]
})
export class LoginComponent {
  username = '';
  password = '';
  loginError = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const success = this.authService.login(this.username, this.password);
    this.loginError = !success;
    if (success) this.router.navigate(['/dashboard']);
  }
}
