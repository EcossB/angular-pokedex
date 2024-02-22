import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DescriptionComponent } from '../description/description.component';
import { PokemonServiceService } from '../pokemon-service.service';
import { AuthService } from '../auth.service';
import { UserLogin } from '../login/userL.interface';
import { RestApiService } from '../rest-api.service';
import { Pokemon } from '../Interfaces/PokemonInterface.interface';


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


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, InfiniteScrollModule, DescriptionComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None
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
    Base: {
      hp: 0,
      attack: 0,
      defense: 0,
      sp_Attack: 0,
      sp_Defense: 0,
      speed: 0}
  };

  userLogged: boolean = false; //si esta falsa esta propiedad es porque el usuario no esta logeado.
  pokemons :Pokemon[] = []; // to storage pokemons.
  idIncrement : number = 1; // How many pokemons will be called for each scroll.
  pokemonSelected = this.selectPokemon  //for behavior subject
  nombrePokemon!: string;
  selection!: Pokemon;
  authservice = inject(AuthService);

  constructor(public http: HttpClient,
    private servicionPokemon: PokemonServiceService,
    private router: Router,
    private apiService: RestApiService){}


  callData(){

    // this.apiService.getPokemon()
    // .subscribe({
    //   next: (response: any) => {
    //     this.pokemons = response.filter((obj:Pokemon) => obj.id <= 65);
    //     console.log(this.pokemons)
    //   },
    //   error: (error) => {
    //     console.log("Error de conexion ", error);
    //   }
    // })

    /**
     * TODO: adding the logic to consume a endpoint from the dotnetApi
     */

    this.apiService.a_getFirst60()
    .subscribe({
      next: (response: any) => {
        console.log(response);
        this.pokemons = response;
      }, 
      error: (error) => {
        console.error(error);
      }
    })

  }

  padNumberImg(id: number) {
    return this.apiService.getImage(id);
  }

  padNumberId(id: number){
    return `N.° ${String(id).padStart(3,'0')}`;
  }


  onScroll(){
    /**
     * TODO: agregar la logica para que el infinite scroll funcione con las llamadas al endpoint de la api. 
     */

    this.idIncrement += 1; // numero Inicial de la pagina
    
    this.apiService.a_getNextPokemons( this.idIncrement , 60) 
    .subscribe({
      next: (response:any) => {
        console.log(response);
        this.pokemons = this.pokemons.concat(response);
      }, 
      error: (error) => {
        console.log(error);
      }
    })

  }



  captilizeString(name: string) :string{
      return name.charAt(0).toUpperCase() + name.slice(1);
  }


  searchPokemon(namep :string){

    // this.apiService.getPokemon()
    // .subscribe({
    //   next: (response: any) => {
    //     this.pokemons = response.filter((obj:Pokemon) => obj.name.english === this.captilizeString(namep));
    //     console.log(this.pokemons);
    //     (this.pokemons.length === 0) ? (alert("Pokemon No encontrado"),  window.location.reload()) : console.log("Pokemon Encontrado");
    //   },
    //   error: (error) => {
    //     console.log("Error de conexion ", error);
    //   }
    // });

    this.apiService.a_getPokemonByName(this.captilizeString(namep)).
    subscribe({
      next: (response: any) => {
        console.log(response);
        this.pokemons = [];
        this.pokemons.push(response);
      },
      error: (error) => {
        console.log(error)
      }
    })

  }

  logout() {
    localStorage.setItem('token', '');
    this.authservice.currenUserSig.set(null);
    }

  selectPokemon(datosPokemon: Pokemon): void{
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
    console.log(this.authservice.currenUserSig());
    this.callData(); 
   }

}

