import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../auth.service';
import { NgForm } from '@angular/forms';
import { first, last } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userExistant: boolean = false;
  cin:string='';
  firstName: string ='';
  lastName: string ='';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  haveCar: string= 'no';
  car: string= '';
  phone: string='';
  address: string='';
  nb_strikes: number=0;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    if (this.password !== this.confirmPassword) {
      console.log("Passwords don't match");
      return;
    }

    const user:any = {
      firstName: this.firstName,
      lastName: this.lastName,
      cin:this.cin,
      email: this.email,
      password: this.password,
      car: this.car,
      phone: this.phone,
      address: this.address,
      nb_strikes: 0
    };

    if (this.haveCar === 'yes') {
      user.car = this.car;
    }
    this.authService.register(user).subscribe(
      (response) => {
        console.log(response);
        console.log('User registered successfully');
        this.router.navigate(['/Auth/Login']);
      },
      (error) => {
        if (error.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Identity number already used !',
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
