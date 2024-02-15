import { Injectable, signal } from "@angular/core";
import { UserRegister } from "./signup/userR.interface";
import { UserLogin } from "./login/userL.interface";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    //creando un signal para que los componentes sepan cuando un usuario esta log in, unauthorized y sin log in.
    // userregister es que esta registrado, undefined es que no esta autorizado y null es que no esta logea.
    currenUserSig = signal<UserRegister | UserLogin | undefined | null>(undefined);
}