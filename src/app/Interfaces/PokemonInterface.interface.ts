export type Name ={
  english: string,
  japanese: string,
  chinese: string,
  french: string
};

export type Base = {
  hp: number,
  attack: number,
  defense: number,
  sp_Attack: number,
  sp_Defense: number,
  speed: number
}


export interface Pokemon{
  id: number,
  name: Name,
  type: string[],
  Base: Base
};