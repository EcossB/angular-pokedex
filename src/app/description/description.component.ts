import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PokemonServiceService } from '../pokemon-service.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  //stid: string,
  name: Name,
  type: string[],
  base: Base
};


@Component({
  selector: 'app-description',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxChartsModule],
  templateUrl: './description.component.html',
  styleUrl: './description.component.css',
  encapsulation: ViewEncapsulation.None //esto permite poder manipular el diseno del chart.
})
export class DescriptionComponent implements OnInit, AfterViewInit{

  title = 'Description'

  pokemon!: Pokemon;
  selectedPokemon$ = this.servicionPokemon.selectedPokemon$;

  constructor(private servicionPokemon: PokemonServiceService){
    
  }


  ngOnInit(): void {
    //console.log(this.selectedPokemon$);
    this.selectedPokemon$.subscribe((data) => {
      console.log(data);
      this.pokemon = data;
      console.log('Datos del pokemon: ', this.pokemon);
      console.log('Base del pokemon: ', this.pokemon.base)
    })
  }

  ngAfterViewInit(): void {

    this.selectedPokemon$.subscribe((data) => {

    this.single = [
      {
        name: 'HP',
        value: data.base.HP,
      },
      {
        name: 'Attack',
        value: data.base.Attack,
      },
      {
        name: 'Defense',
        value: data.base.Defense,
      },
      {
        name: 'Sp. Attack',
        value: data.base['Sp. Attack'],
      },
      {
        name: 'Sp. Defense',
        value: data.base['Sp. Defense'],
      },
      {
        name: 'Speed',
        value: data.base.Speed,
      },
    ];
    })
  }

  padNumberImg(id: number) {
    return `http://172.24.0.152/JSON/DATA/images/${String(id).padStart(3,'0')}.png`;
  }

  padNumberId (id: number){
    return `N.° ${String(id).padStart(3,'0')}`;
  }
  
  padNumberSprite(id: number) {
    return `http://172.24.0.152/JSON/DATA/sprites/${String(id).padStart(3,'0')}MS.png`;
  }

  /**
   * *De aqui en adelante se aplica la logica y para el chart.
   */

  single!: any[];

  view: [number, number] = [900, 300];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;


  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
