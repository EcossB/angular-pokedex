import { Routes } from '@angular/router';
import { DescriptionComponent } from './description/description.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
    {path:'', title:'Pokedex', component:HomeComponent},
    {path: 'descripcion', title:'Description', component: DescriptionComponent},
    {path:'**', component: HomeComponent}
];
