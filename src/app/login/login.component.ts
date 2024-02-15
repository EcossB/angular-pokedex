import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    fb = inject(FormBuilder)

    constructor(
      http: HttpClient
      ){}

    form = this.fb.nonNullable.group({
     username: ['', Validators.required],
     password: ['', Validators.required]
    });
    
    onSubmit(): void {
      console.log('Submit');
    }

    reloadPage() {
    window.location.reload();
    }

}
