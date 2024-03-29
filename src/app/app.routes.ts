import { Routes } from '@angular/router';
import { DescriptionComponent } from './description/description.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardService } from './auth-guard.service';


export const routes: Routes = [
    {path:'', title:'Pokedex', component:HomeComponent},
    {path:'inicio', title:'Pokedex', component:HomeComponent},
    {path: 'descripcion', title:'Description', component: DescriptionComponent, canActivate: [AuthGuardService]},
    {path: 'login', title:'Iniciar Sesion', component: LoginComponent},
    {path: 'signup', title:'Registrarse', component: SignupComponent},
    {path:'**', component: HomeComponent}
];
