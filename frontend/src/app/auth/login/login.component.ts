import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
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
    this.authService.login(credentials).subscribe({
      next: (response) => {
        if(!(response.status === 200) && !(response.status === 400)){
        console.log(response);
        if (credentials.cin == "00000000"){
          this.router.navigate(['/admin/admin-dashboard']);
        }else{
          this.router.navigate(['/']);
        }
        
        }else if(response.status === 400){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Invalid credentials!', // Adjust error message if needed
            confirmButtonColor: "#C21515",
            animation: true
          });
        }
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Invalid credentials!', // Adjust error message if needed
          confirmButtonColor: "#C21515",
          animation: true
        });
        console.error('An error occurred:', error);
      }
    });
  }
  
  }