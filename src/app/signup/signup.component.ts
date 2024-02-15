import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRegister } from './userR.interface';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  fb = inject(FormBuilder);

  constructor(public http: HttpClient){}


  formSignUp = this.fb.nonNullable.group({
    name: ['', Validators.required],
    last_name: ['', Validators.required],
    username: ['', Validators.required],
    passwordd: ['', Validators.required]
  })

    onSubmit() {
    this.http.post<{user:UserRegister}>('https://localhost:7033/register', this.formSignUp.getRawValue())
    .subscribe( response => {
      console.log('Response ',response);
    })
    //console.log(this.formSignUp.getRawValue());
    }

    reloadPage() {
    window.location.reload();
    }

}
