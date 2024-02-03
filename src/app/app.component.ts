import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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


  interface Pokemon{
    id: number,
    stid: string,
    name: Name,
    type: string[],
    base: Base
  };


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Pokedex';

  pokemons :Pokemon[] = [];

  constructor(public http: HttpClient){}

  callData(){
    this.http.get('http://172.24.0.152/JSON/DATA/getjson.php?js=pokedex.json')
    .subscribe({
      next: (response: any) => {
        console.log(response);
        this.pokemons = response;

        //cosa hecha por asarias.
        for (let index = 0; index < 100; index++) {
          let stid:string="";
          stid=parseInt(response[index].id,10).toLocaleString('en-US', {minimumIntegerDigits: 3, useGrouping:false})
          console.log(stid);
         // let pokemons :Pokemon[] = [{id: response[index].id,stid: response[index].stid,name:response[index].name,type:response[index].type,base:response[index].base}];
          this.pokemons.push({id: response[index].id,stid: stid,name:response[index].name,type:response[index].type,base:response[index].base});
        }

      },
      error: (error) => {
        console.log("Error de conexion ", error);
      }
    })
  }

  ngOnInit(): void {
    this.callData();
  }
}
