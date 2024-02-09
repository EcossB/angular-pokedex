import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PokemonServiceService } from '../pokemon-service.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';
import { Moves } from '../home/home.component';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

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
  imports: [CommonModule, FormsModule, NgxChartsModule, NgbModalModule],
  templateUrl: './description.component.html',
  styleUrl: './description.component.css',
  encapsulation: ViewEncapsulation.None //esto permite poder manipular el diseno del chart.
})
export class DescriptionComponent implements OnInit, AfterViewInit{

  title = 'Description'
  @ViewChild('myModal') myModal!: ElementRef;
  pokemon!: Pokemon;
  moves1: Moves[] = []; // para guardar los movimientos si el pokemon tiene 1 solo tipo 
  moves2: Moves[] = []; // para guardar los movimientos si el pokemon tiene 2 tipos.
  selectedPokemon$ = this.servicionPokemon.selectedPokemon$;

  constructor(private servicionPokemon: PokemonServiceService,
    public http : HttpClient,
    private changeDetectorRef: ChangeDetectorRef){

  }


  padNumberImg(id: number): string {
    //return `http://172.24.0.152/JSON/DATA/images/${String(id).padStart(3,'0')}.png`; return image con la url de viamar
  //return de las imagenes con la url local return `http://127.0.0.1/JSON/DATA/images/${String(id).padStart(3,'0')}.png`;
    return `http://172.24.0.152/JSON/DATA/images/${String(id).padStart(3,'0')}.png`;
  }

  padNumberId (id: number): string{
    return `N.° ${String(id).padStart(3,'0')}`;
  }

  padNumberSprite(id: number):string {

    //return `http://127.0.0.1/JSON/DATA/sprites/${String(id).padStart(3,'0')}MS.png`; url de mi casa.
    // `http://172.24.0.152/JSON/DATA/sprites/${String(id).padStart(3,'0')}MS.png`; url de viamar
    return `http://172.24.0.152/JSON/DATA/sprites/${String(id).padStart(3,'0')}MS.png`;
  }


  callMoves(type: string[]):void{
        // url del servidor local en viamar: http://172.24.0.152/JSON/DATA/getjson.php?js=moves.json
    //url del servidor local en mi computador: http://127.0.0.1/JSON/DATA/getjson.php?js=moves.json
    this.http.get('http://172.24.0.152/JSON/DATA/getjson.php?js=moves.json')
    .subscribe({
      next: (response: any) =>{
        //console.log(response);
        // console.log(response.filter((obj: Moves) => obj.type == type[0]));
        // console.log(response.filter((obj: Moves) => obj.type == type[1]));

        for(let i = 0; i <= 1; i++){
          
         (i === 0) ? this.moves1 = response.filter((obj: Moves) => obj.type == type[i]) : this.moves2 = response.filter((obj: Moves) => obj.type == type[i]);
        }
        console.log("array de movimientos: ", this.moves1);
        console.log("array de movimientos 2: ", this.moves2);
      },
      error: (error) =>{
        console.log("Error de conexion para los movimientos", error);
      }
    })
  }

  seeMoves(){
    console.log("array de movimientos: ", this.moves1);
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


  /**
   * *hasta aqui llega la logica del chart.
   */
  

  openModal() {
      this.myModal.nativeElement.style.display = 'block';
      document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    }
    
  closeModal() {
    document.documentElement.style.overflow = 'auto';
    this.myModal.nativeElement.style.display = 'none';
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

    this.callMoves(data.type);

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

    this.changeDetectorRef.detectChanges();
  }


}
