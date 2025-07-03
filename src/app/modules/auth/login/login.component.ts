import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/services/services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule, LoadingSpinnerComponent],
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  error = '';
  loginError = false;

  constructor(private api: ApiService, private router: Router) {}

  get canLogin() {
    return this.username?.trim() && this.password?.trim();
  }
  async onSubmit() {
    this.error = '';
    this.loading = true;
    try {
      const resp = await this.api.login({
        input: this.username,
        password: this.password,
      });
      if (resp.code == 200) {
        localStorage.setItem('token', resp.data.token);
        await this.router.navigate(['/dashboard']);
      } else {
        this.loginError = true;
        this.error = resp.message;
      }
    } catch (err: any) {
      this.loginError = true;
      this.error = err.message || 'Error de login';
    } finally {
      this.loading = false;
    }
  }
}
