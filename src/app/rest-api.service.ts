import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  /**
   * * parte que debe de ver con la url de xamp
   */


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

  /**
   * * From this point forward adding the api endpoint to be consumed
   * * if the atribute or method name start with a_ its because it came from the dotnet api.
   */

  private a_pokemonUrl: string = 'https://localhost:7033/api/Pokemon';
  private a_nameUrl: string = `${this.a_pokemonUrl}/name?name=`;
  private a_first60: string = `${this.a_pokemonUrl}/get60`;
  private a_movesUrl: string = `${this.a_pokemonUrl}/moves`
  private a_typesUrl: string = `${this.a_pokemonUrl}/movesByType?type=`;
  private a_basesUrl: string = `${this.a_pokemonUrl}/bases?name=`

  // method for calling the differents endpoints from the API.

  header_object = new HttpHeaders().set("Authorization", "bearer " + localStorage.getItem('token'));

  httpOptions = {
    headers: this.header_object
  };

  a_getAll(){
    return this.http.get(this.a_pokemonUrl);
  }

  a_getPokemonByName(name : string){
    return this.http.get(this.a_nameUrl + name, this.httpOptions);
  }

  a_getFirst60(){
    return this.http.get(this.a_first60);
  }

  a_getMoves(){
    return this.http.get(this.a_movesUrl, this.httpOptions);
  }

  a_getMovesByType(type: string){
    return this.http.get(this.a_typesUrl + type, this.httpOptions);
  }

  a_getNextPokemons(first: number, limit: number){
    return this.http.get(`https://localhost:7033/api/Pokemon/Next?pagina=${first}&limitRegistro=${limit}`);
  }
  

  a_getBasesByname(name: string){
    return this.http.get(this.a_basesUrl + name, this.httpOptions);
  }

}
