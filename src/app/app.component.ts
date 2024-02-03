import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

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
    name: Name,
    type: string[],
    Base: Base
  };


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Pokedex';
}
