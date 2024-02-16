export type Name ={
  english: string,
  japanese: string,
  chinese: string,
  french: string
};

export type Base = {
  HP: number,
  Attack: number,
  Defense: number,
  "Sp. Attack": number,
  "Sp. Defense": number,
  Speed: number
}


export interface Pokemon{
  id: number,
  name: Name,
  type: string[],
  base: Base
};