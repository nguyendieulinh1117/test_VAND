import type { ErrorFieldType } from '@/types';

export const OPTION_SORTS = [
  {
    id: 1,
    value: 'number',
    label: 'Number Ascending'
  },
  {
    id: 2,
    value: '-number',
    label: 'Number Descending'
  },
  {
    id: 3,
    value: 'total',
    label: 'Total Ascending'
  },
  {
    id: 4,
    value: '-total',
    label: 'Total Descending'
  },
  {
    id: 5,
    value: 'hp',
    label: 'HP Ascending'
  },
  {
    id: 6,
    value: '-hp',
    label: 'HP Descending'
  },
  {
    id: 7,
    value: 'attack',
    label: 'Attack Ascending'
  },
  {
    id: 8,
    value: '-attack',
    label: 'Attack Descending'
  },
  {
    id: 9,
    value: 'defense',
    label: 'Defense Ascending'
  },
  {
    id: 10,
    value: '-defense',
    label: 'Defense Descending'
  },
  {
    id: 11,
    value: 'sp_atk',
    label: 'SP ATK Ascending'
  },
  {
    id: 12,
    value: '-sp_atk',
    label: 'SP ATK Descending'
  },
  {
    id: 13,
    value: 'sp_def',
    label: 'SP DEF Ascending'
  },
  {
    id: 14,
    value: '-sp_def',
    label: 'SP DEF Descending'
  },
  {
    id: 15,
    value: 'speed',
    label: 'Speed Ascending'
  },
  {
    id: 16,
    value: '-speed',
    label: 'Speed Descending'
  }
];

export const INITIAL_FILTER_VALUE = {
  'page[number]': 1,
  'page[size]': 12,
  'filter[type]': undefined,
  sort: '',
  'filter[min_total]': undefined,
  'filter[max_total]': undefined,
  'filter[min_speed]': undefined,
  'filter[max_speed]': undefined,
  'filter[min_sp_def]': undefined,
  'filter[max_sp_def]': undefined,
  'filter[max_sp_atk]': undefined,
  'filter[min_sp_atk]': undefined,
  'filter[max_hp]': undefined,
  'filter[min_hp]': undefined,
  'filter[max_defense]': undefined,
  'filter[min_defense]': undefined,
  'filter[max_attack]': undefined,
  'filter[min_attack]': undefined
};

export const ERROR_FIELDS: ErrorFieldType = {
  min_total: false,
  max_total: false,
  min_speed: false,
  max_speed: false,
  min_sp_def: false,
  max_sp_def: false,
  max_sp_atk: false,
  min_sp_atk: false,
  max_hp: false,
  min_hp: false,
  max_defense: false,
  min_defense: false,
  max_attack: false,
  min_attack: false
};
