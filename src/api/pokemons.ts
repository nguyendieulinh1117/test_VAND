import type { ParamType, ParamsListType } from '@/types';
import axiosClient from './axiosClient';

export default {
  getList: (params: ParamsListType) => {
    const filteredParams: ParamType = {};
    for (const key in params) {
      if (
        params[key as keyof ParamsListType] !== null &&
        params[key as keyof ParamsListType] !== undefined &&
        params[key as keyof ParamsListType] !== ''
      ) {
        filteredParams[key] = params[key as keyof ParamsListType];
      }
    }
    return axiosClient.get('/pokemons', {
      params: filteredParams
    });
  },

  getDetail: (id: string) => {
    return axiosClient.get(`/pokemons/${id}`);
  },

  getTypes: () => {
    return axiosClient.get('/types');
  },

  downloadSprite: (id: string) => {
    return axiosClient.get(`pokemons/${id}/sprite`, { responseType: 'blob' });
  }
};
