import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserLogin } from './userL.interface';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    fb = inject(FormBuilder);
    authService = inject(AuthService);
    router = inject(Router);

    constructor(
      public http: HttpClient,
      private apiService: RestApiService
      ){}

    form = this.fb.nonNullable.group({
     username: ['', Validators.required],
     password: ['', Validators.required]
    });

    //
    onSubmit(): void {
      this.apiService.loginUser(this.form)
      .subscribe((response:any) => {
        console.log("Response", response);
        localStorage.setItem('token', response.token);
        this.authService.currenUserSig.set(response.user); // notificando a toda la app que esta registrado
        this.router.navigateByUrl('/');
      });
    }

    reloadPage() {
    window.location.reload();
    }

}
