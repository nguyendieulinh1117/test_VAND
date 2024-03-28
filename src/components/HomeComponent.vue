<script setup lang="ts">
import { ref, watch } from 'vue'
import type { PokemonType, CategoryType, ParamsListType } from '../types'
import { optionSorts } from '../utils/contants'
import apiPokemon from '../api/pokemons'
import ModalComponent from './ModalComponent.vue'
import PokemonComponent from './PokemonComponent.vue'
import Pagination from './Pagination.vue'

const isShow = ref<Boolean>(false)
const loading = ref(true)
const loadingType = ref(true)
const pokemonData = ref<PokemonType[]>([])
const pokemonType = ref<CategoryType[]>([])
const pokemonDetail = ref<PokemonType>()
const pokemonSprite = ref()

const pagination = ref({
  total: 0,
  currentPage: 1
})

const filterField = ref({
  'filter[type]': undefined,
  sort: '',
  'filter[min_total]': undefined,
  'filter[max_total]': undefined
})

const getData = async (params: ParamsListType) => {
  try {
    const response = await apiPokemon.getList(params)
    pokemonData.value = response.data.data
    pagination.value.total = response.data.meta.last_page
    pagination.value.currentPage = response.data.meta.current_page
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

const getTypeData = async () => {
  try {
    const response = await apiPokemon.getTypes()
    pokemonType.value = response.data.data
  } catch (error) {
    console.log(error)
  } finally {
    loadingType.value = false
  }
}

const getDetail = async (id: string) => {
  try {
    const response = await apiPokemon.getDetail(id)
    pokemonDetail.value = response.data.data
  } catch (error) {
    console.log(error)
  } finally {
    isShow.value = true
  }
}
const getSprite = async (id: string) => {
  try {
    const response = await apiPokemon.downloadSprite(id)

    const reader = new FileReader()
    // When FileReader finishes reading the Blob
    reader.onload = () => {
      // 'reader.result' contains the data as a data URL
      pokemonSprite.value = reader.result
    }

    // Read the Blob as a data URL
    reader.readAsDataURL(response.data)
  } catch (error) {
    console.log(error)
  } finally {
    isShow.value = true
  }
}
const handleRefresh = () => {
  loading.value = true
  filterField.value = {
    'filter[type]': undefined,
    sort: '',
    'filter[min_total]': undefined,
    'filter[max_total]': undefined
  }
  getData({
    'page[number]': 1,
    'page[size]': 10
  })
}

const handleView = (id: string) => {
  getDetail(id)
  getSprite(id)
}
const handleClose = () => {
  isShow.value = false
  pokemonDetail.value = undefined
  pokemonSprite.value = ''
}

const goToPage = (pageNumber: number) => {
  pagination.value.currentPage = pageNumber
  loading.value = true
  getData({
    ...filterField.value,
    'page[number]': pageNumber,
    'page[size]': 10
  })
}

const onFilter = () => {
  loading.value = true
  getData({
    ...filterField.value,
    'page[number]': 1,
    'page[size]': 10
  })
}

const handleSubmit = () => {
  console.log(filterField.value)
}

getData({
  'page[number]': 1,
  'page[size]': 10
})
getTypeData()
</script>

<template>
  <div class="container">
    <h2>LIST OF POKEMONS</h2>
    <div class="tools">
      <button @click="handleRefresh" :disabled="loading">Refresh</button>
      <select v-if="!loadingType" v-model="filterField['filter[type]']" @change="onFilter">
        <option key="selectType" disabled :value="undefined">Select type</option>
        <option v-for="typePoke in pokemonType" :key="typePoke.id" :value="typePoke.id">
          {{ typePoke.name }}
        </option>
      </select>
      <select v-model="filterField.sort" @change="onFilter">
        <option key="selectType" disabled value="">Sort</option>
        <option v-for="option in optionSorts" :key="option.id" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <form class="filterForm" @submit.prevent="handleSubmit">
        <div>
          <label for="sliderMin">Choose min total:</label>
          <input
            type="range"
            id="sliderMin"
            min="180"
            max="770"
            v-model="filterField['filter[min_total]']"
          />
          {{ filterField['filter[min_total]'] }}
        </div>
        <div>
          <label for="sliderMax">Choose max total:</label>
          <input
            type="range"
            id="sliderMax"
            min="180"
            max="770"
            v-model="filterField['filter[max_total]']"
          />
          {{ filterField['filter[max_total]'] }}
        </div>
        <button type="submit" :disabled="loading">Filter</button>
      </form>
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
