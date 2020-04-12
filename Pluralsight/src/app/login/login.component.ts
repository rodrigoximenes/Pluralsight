import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { User } from './user';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  user = new User();

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  login() {
    console.log('Login: ' + JSON.stringify(this.userForm.value));
    this.authService.login(
      this.userForm.get('usuario').value,
      this.userForm.get('senha').value
    );

    if (this.authService.redirectUrl) {
      this.router.navigateByUrl(this.authService.redirectUrl);
    } else {
      this.router.navigate(['/products']);
    }
  }
}
