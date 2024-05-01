import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../auth.service';
import { NgForm, NgModel } from '@angular/forms';
import { first, last } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../models/User';



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
  avatar:string='';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    if (this.password !== this.confirmPassword) {
      console.log("Passwords don't match");
      return;
    }
    const user: User = new User(this.cin,this.firstName,this.lastName,this.email, this.password,this.phone,this.address,this.car,0,null);

    if (this.haveCar === 'yes') {
      user.car = this.car;
    }
    this.authService.register(user).subscribe(
      (response) => {
        console.log(response);
        console.log('User registered successfully');
        this.router.navigate(['/auth/login']);
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
