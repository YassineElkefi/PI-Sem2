import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  cin: string='';
  password: string= '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    const credentials: any = {
      cin: this.cin,
      password: this.password
    };
    this.authService.login(credentials).subscribe(
      (response) => {
        console.log(response);
        console.log('User logged in successfully');
        this.router.navigate(['/Carpooling']);
      },
      (error) => {
        if (error.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Invalid Credentials !',
            confirmButtonColor:"#C21515",
            animation: true
          });
        } else {
          console.log(error);
        }
      }
    );
  }
  }