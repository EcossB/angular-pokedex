import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from './login/userL.interface';
import { FormGroup } from '@angular/forms';
import { UserRegister } from './signup/userR.interface';
@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(public http: HttpClient) { }

  //url del servidor local en viamar: http://172.24.0.152
  //url del servidor local en mi computador: http://127.0.0.1
  //url de la api https://localhost:7033/api/Pokemon


  private apiHoast: string = 'http://172.24.0.152/';
  private pokedexUrl: string = `${this.apiHoast}JSON/DATA/getjson.php?js=pokedex.json`;
  private movesUrl: string = `${this.apiHoast}JSON/DATA/getjson.php?js=moves.json`;
  private apiUserUrl: string = 'https://localhost:7033';
  

  getPokemon(){
    return this.http.get(this.pokedexUrl);
  }

  getMoves(){
    return this.http.get(this.movesUrl);
  }

  getImage(id: number){
    return `${this.apiHoast}JSON/DATA/images/${String(id).padStart(3,'0')}.png`;
  }

  getsprites(id: number): string{
    return `${this.apiHoast}JSON/DATA/sprites/${String(id).padStart(3,'0')}MS.png`;
  }

  /**
   * * adding the calls to user api, this url its different from the pokemons. 
   * * Also these calls are POST instead GET
   */

  loginUser(form: FormGroup){
    return this.http.post<{user:UserLogin}>(`${this.apiUserUrl}/login`, form.getRawValue());
  }

  registerUser(form: FormGroup){
    return this.http.post<{user:UserRegister}>(`${this.apiUserUrl}/register`, form.getRawValue());

  }


}
