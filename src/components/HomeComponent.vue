<script setup lang="ts">
import { ref, watch } from 'vue';
import type { PokemonType, CategoryType } from '../types';
import { OPTION_SORTS, INITIAL_FILTER_VALUE } from '../utils/contants';
import apiPokemon from '../api/pokemons';
import ModalComponent from './ModalComponent.vue';
import PokemonComponent from './PokemonComponent.vue';
import Pagination from './Pagination.vue';
import FormFilter from './FormFilter.vue';

const isShow = ref<Boolean>(false);
const loading = ref(true);
const loadingType = ref(true);
const pokemonData = ref<PokemonType[]>([]);
const pokemonType = ref<CategoryType[]>([]);
const pokemonDetail = ref<PokemonType>();
const pokemonSprite = ref();
const pagination = ref({
  total: 0,
  currentPage: 1
});

const filterField = ref({ ...INITIAL_FILTER_VALUE });

const getData = async () => {
  if (loading.value) {
    try {
      const response = await apiPokemon.getList(filterField.value);
      pokemonData.value = response.data.data;
      pagination.value.total = response.data.meta.last_page;
      pagination.value.currentPage = response.data.meta.current_page;
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  }
};

const getTypeData = async () => {
  try {
    const response = await apiPokemon.getTypes();
    pokemonType.value = response.data.data;
  } catch (error) {
    console.log(error);
  } finally {
    loadingType.value = false;
  }
};

const getDetail = async (id: string) => {
  try {
    const response = await apiPokemon.getDetail(id);
    pokemonDetail.value = response.data.data;
  } catch (error) {
    console.log(error);
  } finally {
    isShow.value = true;
  }
};

const getSprite = async (id: string) => {
  try {
    const response = await apiPokemon.downloadSprite(id);

    const reader = new FileReader();
    // When FileReader finishes reading the Blob
    reader.onload = () => {
      // 'reader.result' contains the data as a data URL
      pokemonSprite.value = reader.result;
    };

    // Read the Blob as a data URL
    reader.readAsDataURL(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    isShow.value = true;
  }
};

const handleRefresh = () => {
  filterField.value = { ...INITIAL_FILTER_VALUE };
  loading.value = true;
};

const handleView = (id: string) => {
  getDetail(id);
  getSprite(id);
};

const handleClose = () => {
  isShow.value = false;
  pokemonDetail.value = undefined;
  pokemonSprite.value = '';
};

const goToPage = (pageNumber: number) => {
  pagination.value.currentPage = pageNumber;
  filterField.value['page[number]'] = pageNumber;
  loading.value = true;
};

const onFilter = () => {
  filterField.value['page[number]'] = 1;
  loading.value = true;
};

getTypeData();
watch(loading, getData, { immediate: true });
</script>

<template>
  <div class="container">
    <h2>LIST OF POKEMONS</h2>
    <div class="tools">
      <FormFilter :filter-field="filterField" :on-filter="onFilter" :on-refresh="handleRefresh" />
      <select v-if="!loadingType" v-model="filterField['filter[type]']" @change="onFilter">
        <option key="selectType" disabled :value="undefined">Select type</option>
        <option v-for="typePoke in pokemonType" :key="typePoke.id" :value="typePoke.id">
          {{ typePoke.name }}
        </option>
      </select>
      <select v-model="filterField.sort" @change="onFilter">
        <option key="selectType" disabled value="">Sort</option>
        <option v-for="option in OPTION_SORTS" :key="option.id" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
    <div v-if="loading || loadingType" class="wrapper-loader">
      <div class="loader"></div>
    </div>
    <div v-if="!loading && !loadingType" class="wrapper-card">
      <div class="list-card">
        <div v-for="pokemon in pokemonData" class="card" :key="pokemon.id">
          <PokemonComponent
            :pokemonType="pokemonType"
            :pokemon="pokemon"
            :handle-view="handleView"
          />
        </div>
      </div>
      <Pagination
        :total-pages="pagination.total"
        :current-page="pagination.currentPage"
        :go-to-page="goToPage"
      />
    </div>
  </div>

  <ModalComponent
    :show="isShow"
    :handle-close="handleClose"
    :pokemonSprite="pokemonSprite"
    :pokemonDetail="pokemonDetail"
    :pokemonType="pokemonType"
  />
</template>
