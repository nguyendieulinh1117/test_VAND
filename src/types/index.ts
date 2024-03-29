export type GenerationType = 1 | 2 | 3 | 4 | 5 | 6;

export type LegendaryType = 0 | 1;

export type ParamsListType = {
  'page[number]'?: number;
  'page[size]'?: number;
  sort?: string;
  'filter[name]'?: string;
  'filter[generation]'?: GenerationType;
  'filter[legendary]'?: LegendaryType;
  'filter[type]'?: number;
  'filter[min_total]'?: number;
  'filter[max_total]'?: number;
  'filter[min_speed]'?: number;
  'filter[max_speed]'?: number;
  'filter[min_sp_def]'?: number;
  'filter[max_sp_def]'?: number;
  'filter[max_sp_atk]'?: number;
  'filter[min_sp_atk]'?: number;
  'filter[max_hp]'?: number;
  'filter[min_hp]'?: number;
  'filter[max_defense]'?: number;
  'filter[min_defense]'?: number;
  'filter[max_attack]'?: number;
  'filter[min_attack]'?: number;
};

export interface ParamType {
  [key: string]: string | number | GenerationType | LegendaryType | undefined;
}

export type PokemonType = {
  id: string;
  number: number;
  name: string;
  type_1: number;
  type_2: number;
  total: number;
  hp: number;
  attack: number;
  defense: number;
  sp_atk: number;
  sp_def: number;
  speed: number;
  generation: GenerationType;
  legendary: LegendaryType;
  created_at: string;
  updated_at: string;
};

export type CategoryType = {
  id: number;
  name: string;
};

export type ErrorFieldType = {
  [key: string]: boolean;
};
