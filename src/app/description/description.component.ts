import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PokemonServiceService } from '../pokemon-service.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClient } from '@angular/common/http';
import { Base, Pokemon } from '../Interfaces/PokemonInterface.interface';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from '../rest-api.service';
import { Moves } from '../Interfaces/moveInterface.interface';


@Component({
  selector: 'app-description',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxChartsModule, NgbModalModule],
  templateUrl: './description.component.html',
  styleUrl: './description.component.css',
  encapsulation: ViewEncapsulation.None //esto permite poder manipular el diseno del chart.
})
export class DescriptionComponent implements OnInit{

  title = 'Description'
  @ViewChild('myModal') myModal!: ElementRef;
  pokemon!: Pokemon;
  BasePokemon !: Base;
  moves1: Moves[] = []; // para guardar los movimientos si el pokemon tiene 1 solo tipo 
  moves2: Moves[] = []; // para guardar los movimientos si el pokemon tiene 2 tipos.
  selectedPokemon$ = this.servicionPokemon.selectedPokemon$;

  constructor(private servicionPokemon: PokemonServiceService,
    public http : HttpClient,
    private apiService: RestApiService){
  }

  padNumberImg(id: number): string {
    return this.apiService.getImage(id);
  }

  padNumberId (id: number): string{
    return `N.° ${String(id).padStart(3,'0')}`;
  }

  padNumberSprite(id: number):string {
    return this.apiService.getsprites(id);
  }


  callMoves(type: string[]):void{
    // this.apiService.getMoves()
    // .subscribe({
    //   next: (response: any) =>{
    //     for(let i = 0; i <= 1; i++){
    //      (i === 0) ? this.moves1 = response.filter((obj: Moves) => obj.type == type[i]) : this.moves2 = response.filter((obj: Moves) => obj.type == type[i]);
    //     }
    //     console.log("array de movimientos: ", this.moves1);
    //     console.log("array de movimientos 2: ", this.moves2);
    //   },
    //   error: (error) =>{
    //     console.log("Error de conexion para los movimientos", error);
    //   }
    // })
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
  /**
   * *hasta aqui llega la logica del chart.
   */
  

  /**
   * *Logica del modal 
   * --------------------------------------------------------------------
   */

  openModal() {
      this.myModal.nativeElement.style.display = 'block';
      document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    }
    
  closeModal() {
    document.documentElement.style.overflow = 'auto';
    this.myModal.nativeElement.style.display = 'none';
  }

  /*--------------------------------------------------------------------- */
    

  callPokemonByName(name : string){

    this.apiService.a_getPokemonByName(name)
    .subscribe({
      next: (response: any) => {
        this.pokemon = response;

        console.log("respuestas de name")
        console.log(response);
      }
    })

  }

  callBasesByname(name: string){
    this.apiService.a_getBasesByname(name)
    .subscribe({
      next: (response: any) => {

        this.BasePokemon = response;
        console.log("Respuesta de bases.")
        console.log(response.hp);

        //This.single es un arreglo de objetos para el ngx-chart.
        this.single = [
          {
            name: 'HP',
            value: this.BasePokemon.hp,
          },
          {
            name: 'Attack',
            value: this.BasePokemon.attack,
          },
          {
            name: 'Defense',
            value: this.BasePokemon.defense,
          },
          {
            name: 'Sp. Attack',
            value: this.BasePokemon.sp_Attack,
          },
          {
            name: 'Sp. Defense',
            value: this.BasePokemon.sp_Defense,
          },
          {
            name: 'Speed',
            value: this.BasePokemon.speed,
          },
        ];

      }
    })
  }

  


  ngOnInit(): void {
    this.selectedPokemon$.subscribe((data) => {
      console.log(data);
      this.pokemon = data;
      this.callPokemonByName(data.name.english);
      this.callBasesByname(data.name.english);
      this.callMoves(data.type);
  
      })    
  }


}
