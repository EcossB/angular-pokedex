import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(public http: HttpClient) { }

  //url del servidor local en viamar: http://172.24.0.152
  //url del servidor local en mi computador: http://127.0.0.1

  private apiHoast: string = 'http://172.24.0.152/';
  private pokedexUrl: string = `${this.apiHoast}JSON/DATA/getjson.php?js=pokedex.json`;
  private movesUrl: string = `${this.apiHoast}JSON/DATA/getjson.php?js=moves.json`;
  private apiUserUrl: string = 'https://localhost:7033/login';
  

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
   * 
   * 
   */


}
