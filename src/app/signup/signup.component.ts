import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRegister } from './userR.interface';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  constructor(
    public http: HttpClient,
    private apiService: RestApiService ){}


  formSignUp = this.fb.nonNullable.group({
    name: ['', Validators.required],
    last_name: ['', Validators.required],
    username: ['', Validators.required],
    passwordd: ['', Validators.required]
  })

    onSubmit() {
    this.apiService.registerUser(this.formSignUp)
    .subscribe((response:any) => {
      console.log("Response", response);
      localStorage.setItem('token', response.token);
      this.authService.currenUserSig.set(response.user); // notificando a toda la app que esta registrado
      this.router.navigateByUrl('/');
    });
    };

    reloadPage() {
    window.location.reload();
    }

}
