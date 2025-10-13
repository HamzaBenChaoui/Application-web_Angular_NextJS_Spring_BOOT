import { Component } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  fname: string = '';
  lname: string = '';
  email: string = '';
  password: string = '';
  showPassword = false;
  isChecked = false;
  disabled = false; // Assuming 'disabled' is a property for the checkbox

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
