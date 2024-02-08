import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DescriptionComponent } from '../description/description.component';
import { PokemonServiceService } from '../pokemon-service.service';


/**
 * *Json body. and example of the data that is coming.
 * 
 * {
    "id": 1,
    "name": {
      "english": "Bulbasaur",
      "japanese": "フシギダネ",
      "chinese": "妙蛙种子",
      "french": "Bulbizarre"
    },
    "type": [
      "Grass",
      "Poison"
    ],
    "base": {
      "HP": 45,
      "Attack": 49,
      "Defense": 49,
      "Sp. Attack": 65,
      "Sp. Defense": 65,
      "Speed": 45
    }
  }
 */

  type Name ={
    english: string,
    japanese: string,
    chinese: string,
    french: string
  };

  type Base = {
    HP: number,
    Attack: number,
    Defense: number,
    "Sp. Attack": number,
    "Sp. Defense": number,
    Speed: number
  }


export interface Pokemon{
    id: number,
    //stid: string,
    name: Name,
    type: string[],
    base: Base
  };

export interface Moves{
  accuracy: number,
  category: string,
  cname: string,
  ename: string,
  id: number,
  jname: string,
  power: number,
  pp: number,
  type: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, InfiniteScrollModule, DescriptionComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  title = 'Pokedex';

  initPokemon : Pokemon = {
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

  pokemons :Pokemon[] = [];

  idIncrement : number = 10;

  pokemonSelected = this.selectPokemon
  nombrePokemon!: string;

  selection!: Pokemon;

  constructor(public http: HttpClient,
    private servicionPokemon: PokemonServiceService,
    private router: Router){}


  callData(){
    this.http.get('http://172.24.0.152/JSON/DATA/getjson.php?js=pokedex.json')
    .subscribe({
      next: (response: any) => {
        //console.log(response);
        this.pokemons = response.filter((obj:Pokemon) => obj.id <= 20);
      },
      error: (error) => {
        console.log("Error de conexion ", error);
      }
    })
  }

  padNumberImg(id: number) {
    return `http://172.24.0.152/JSON/DATA/images/${String(id).padStart(3,'0')}.png`;
  }

  padNumberId(id: number){
    return `N.° ${String(id).padStart(3,'0')}`;
  }


  onScroll(){

    this.idIncrement += 6;

    this.http.get('http://172.24.0.152/JSON/DATA/getjson.php?js=pokedex.json')
    .subscribe({
      next: (response: any) => {
        //console.log(response);
        this.pokemons = response.filter((obj:Pokemon) => obj.id <= this.idIncrement);
      }});
  }



  captilizeString(name: string) :string{
      return name.charAt(0).toUpperCase() + name.slice(1);
  }


  searchPokemon(namep :string){

    console.log(this.captilizeString(namep));

    this.http.get('http://172.24.0.152/JSON/DATA/getjson.php?js=pokedex.json')
    .subscribe({
      next: (response: any) => {
        this.pokemons = response.filter((obj:Pokemon) => obj.name.english === this.captilizeString(namep));
        console.log(this.pokemons);

        (this.pokemons.length === 0) ? (alert("Pokemon No encontrado"),  window.location.reload()) : console.log("Pokemon Encontrado");
      },
      error: (error) => {
        console.log("Error de conexion ", error);
      }
    });
  }


  selectPokemon(datosPokemon: Pokemon): void{
   // console.log(datosPokemon);
    // this.initPokemon = datosPokemon;
    // console.log("init pokemon:",this.initPokemon);
    // this.router.navigate(['/descripcion']);
    // this.servicionPokemon.disparadorPokemon.emit({data: datosPokemon});
    this.servicionPokemon.setPokemon(datosPokemon);
    
  }


  reloadPage() {
    window.location.reload();
    }


  onScrollUp(){
    console.log('Estas en el tope.');
  }

  ngOnInit(): void {
    this.servicionPokemon.selectedPokemon$.subscribe(pokemon => this.selection = pokemon)
    this.callData();  }

}

