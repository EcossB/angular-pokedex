import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserLogin } from './userL.interface';


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
      public http: HttpClient
      ){}

    form = this.fb.nonNullable.group({
     username: ['', Validators.required],
     password: ['', Validators.required]
    });
    
    onSubmit(): void {
      this.http.post<{user:UserLogin}>('https://localhost:7033/login', 
      this.form.getRawValue())
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
