import { EventEmitter, Injectable, Output } from '@angular/core';
import { Pokemon } from './home/home.component';
import { BehaviorSubject, Observable } from 'rxjs';


const initPokemon : Pokemon = {
  id: 0,
  name: {
    english: '',
    japanese: '',
    chinese: '',
    french: ''
  },
  type: [],
  base: { 
    HP: 0,
    Attack: 0,
    Defense: 0,
    "Sp. Attack": 0,
    "Sp. Defense": 0,
    Speed: 0}
};

@Injectable({
  providedIn: 'root'
})
export class PokemonServiceService {


  /**
   * *Funcionamiento del subject pokemon$
   * 
   * El behaviorSubject sirve para poder comunicar dos componentes que esten enrutados
   * es decir, con este tipo de subject podemos saber el valor anterior de un objeto 
   * y ese objeto mandarlo para un nuevo componente en su ciclo de vida. 
   * 
   * la diferencia entre el BehaviorSubject y el Subject es que el subject va a obtener el valor
   * que venga y el behavior tendra el valor anterior. 
   * 
   * ---*-----(el behavior sabra el valor del aterisco anterior.)-----*---
   * 
   * *private pokemon$ = new BehaviorSubject<Pokemon>(initPokemon);
   *                                           ||
   *                                           ||
   *  aqui sabemos el tipo de dato que debe de recibir el behavior y el pasamos un objeto de ese tipo ya inicializado.
   * 
   *  *get selectedPokemon$():Observable<Pokemon>{
   *  *return this.pokemon$.asObservable();
   *  *}
   * Este metodo lo que hace es retornar el objeto pokemon$ 
   * y se manda como observable porque to create custom Observer-side logic of the Subjec
   *
   *   *setPokemon(pokemon:Pokemon):void{
   *   *  this.pokemon$.next(pokemon);
   *   *}
   * 
   * este metodo es para que en el componente se pase el objeto que va a tener el behavior
   * como dato anterior.
   * 
   * 
   */
  private pokemon$ = new BehaviorSubject<Pokemon>(initPokemon);
  constructor() { }

  get selectedPokemon$():Observable<Pokemon>{
    return this.pokemon$.asObservable();
  }

  setPokemon(pokemon:Pokemon):void{
    this.pokemon$.next(pokemon);
  }
}
