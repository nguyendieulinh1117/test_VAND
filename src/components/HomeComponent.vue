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
const errorsList = ref<string[]>([])
const pagination = ref({
  total: 0,
  currentPage: 1
})

const filterField = ref({
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

  const errors: string[] = []
  //check total
  if (filterField.value['filter[min_total]']) {
    if (filterField.value['filter[min_total]'] < 180) {
      errors.push('Min total must be greater than or equal 180')
    }
    if (filterField.value['filter[min_total]'] > 770) {
      errors.push('Min total must be less than or equal 770')
    }
  }

  if (filterField.value['filter[max_total]']) {
    if (filterField.value['filter[max_total]'] < 180) {
      errors.push('Max total must be greater than or equal 180')
    }
    if (filterField.value['filter[max_total]'] > 770) {
      errors.push('Max total must be less than or equal 770')
    }
  }

  if (
    filterField.value['filter[max_total]'] &&
    filterField.value['filter[min_total]'] &&
    filterField.value['filter[max_total]'] < filterField.value['filter[min_total]']
  ) {
    errors.push('Max total must be greater than or equal Min total')
  }

  //check speed
  if (filterField.value['filter[min_speed]']) {
    if (filterField.value['filter[min_speed]'] < 5) {
      errors.push('Min speed must be greater than or equal 5')
    }
    if (filterField.value['filter[min_speed]'] > 180) {
      errors.push('Min speed must be less than or equal 770')
    }
  }

  if (filterField.value['filter[max_speed]']) {
    if (filterField.value['filter[max_speed]'] < 5) {
      errors.push('Max speed must be greater than or equal 5')
    }
    if (filterField.value['filter[max_speed]'] > 180) {
      errors.push('Max speed must be less than or equal 180')
    }
  }

  if (
    filterField.value['filter[max_speed]'] &&
    filterField.value['filter[min_speed]'] &&
    filterField.value['filter[max_speed]'] < filterField.value['filter[min_speed]']
  ) {
    errors.push('Max speed must be greater than or equal Min speed')
  }

  //check sp_def
  if (filterField.value['filter[min_sp_def]']) {
    if (filterField.value['filter[min_sp_def]'] < 20) {
      errors.push('Min sp_def must be greater than or equal 20')
    }
    if (filterField.value['filter[min_sp_def]'] > 230) {
      errors.push('Min sp_def must be less than or equal 230')
    }
  }

  if (filterField.value['filter[max_sp_def]']) {
    if (filterField.value['filter[max_sp_def]'] < 20) {
      errors.push('Max sp_def must be greater than or equal 20')
    }
    if (filterField.value['filter[max_sp_def]'] > 230) {
      errors.push('Max sp_def must be less than or equal 230')
    }
  }

  if (
    filterField.value['filter[max_sp_def]'] &&
    filterField.value['filter[min_sp_def]'] &&
    filterField.value['filter[max_sp_def]'] < filterField.value['filter[min_sp_def]']
  ) {
    errors.push('Max sp_def must be greater than or equal Min sp_def')
  }

  //check sp_atk
  if (filterField.value['filter[min_sp_atk]']) {
    if (filterField.value['filter[min_sp_atk]'] < 10) {
      errors.push('Min sp_atk must be greater than or equal 10')
    }
    if (filterField.value['filter[min_sp_atk]'] > 180) {
      errors.push('Min sp_atk must be less than or equal 180')
    }
  }

  if (filterField.value['filter[max_sp_atk]']) {
    if (filterField.value['filter[max_sp_atk]'] < 10) {
      errors.push('Max sp_atk must be greater than or equal 10')
    }
    if (filterField.value['filter[max_sp_atk]'] > 180) {
      errors.push('Max sp_atk must be less than or equal 180')
    }
  }

  if (
    filterField.value['filter[max_sp_atk]'] &&
    filterField.value['filter[min_sp_atk]'] &&
    filterField.value['filter[max_sp_atk]'] < filterField.value['filter[min_sp_atk]']
  ) {
    errors.push('Max sp_atk must be greater than or equal Min sp_atk')
  }

  //check hp
  if (filterField.value['filter[min_hp]']) {
    if (filterField.value['filter[min_hp]'] < 1) {
      errors.push('Min hp must be greater than or equal 1')
    }
    if (filterField.value['filter[min_hp]'] > 225) {
      errors.push('Min hp must be less than or equal 225')
    }
  }

  if (filterField.value['filter[max_hp]']) {
    if (filterField.value['filter[max_hp]'] < 1) {
      errors.push('Max hp must be greater than or equal 1')
    }
    if (filterField.value['filter[max_hp]'] > 225) {
      errors.push('Max hp must be less than or equal 225')
    }
  }

  if (
    filterField.value['filter[max_hp]'] &&
    filterField.value['filter[min_hp]'] &&
    filterField.value['filter[max_hp]'] < filterField.value['filter[min_hp]']
  ) {
    errors.push('Max hp must be greater than or equal Min hp')
  }

  //check defense
  if (filterField.value['filter[min_defense]']) {
    if (filterField.value['filter[min_defense]'] < 5) {
      errors.push('Min defense must be greater than or equal 5')
    }
    if (filterField.value['filter[min_defense]'] > 230) {
      errors.push('Min defense must be less than or equal 230')
    }
  }

  if (filterField.value['filter[max_defense]']) {
    if (filterField.value['filter[max_defense]'] < 5) {
      errors.push('Max defense must be greater than or equal 5')
    }
    if (filterField.value['filter[max_defense]'] > 230) {
      errors.push('Max defense must be less than or equal 230')
    }
  }

  if (
    filterField.value['filter[max_defense]'] &&
    filterField.value['filter[min_defense]'] &&
    filterField.value['filter[max_defense]'] < filterField.value['filter[min_defense]']
  ) {
    errors.push('Max defense must be greater than or equal Min defense')
  }

  //check attack
  if (filterField.value['filter[min_attack]']) {
    if (filterField.value['filter[min_attack]'] < 5) {
      errors.push('Min attack must be greater than or equal 5')
    }
    if (filterField.value['filter[min_attack]'] > 180) {
      errors.push('Min attack must be less than or equal 180')
    }
  }

  if (filterField.value['filter[max_attack]']) {
    if (filterField.value['filter[max_attack]'] < 5) {
      errors.push('Max attack must be greater than or equal 5')
    }
    if (filterField.value['filter[max_attack]'] > 180) {
      errors.push('Max attack must be less than or equal 180')
    }
  }

  if (
    filterField.value['filter[max_attack]'] &&
    filterField.value['filter[min_attack]'] &&
    filterField.value['filter[max_attack]'] < filterField.value['filter[min_attack]']
  ) {
    errors.push('Max attack must be greater than or equal Min total')
  }
  if (errors.length > 0) {
    errorsList.value = errors
    return
  }
  loading.value = true
  getData({
    ...filterField.value,
    'page[number]': 1,
    'page[size]': 10
  })
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
          <label for="totalMin">Enter min total:</label>
          <input type="number" id="totalMin" v-model="filterField['filter[min_total]']" />
        </div>
        <div>
          <label for="totalMax">Enter max total:</label>
          <input type="number" id="totalMax" v-model="filterField['filter[max_total]']" />
        </div>
        <div>
          <label for="speedMin">Enter min speed:</label>
          <input type="number" id="speedMin" v-model="filterField['filter[min_speed]']" />
        </div>
        <div>
          <label for="speedMax">Enter max speed:</label>
          <input type="number" id="speedMax" v-model="filterField['filter[max_speed]']" />
        </div>
        <div>
          <label for="sp_defMin">Enter min sp_def:</label>
          <input type="number" id="sp_defMin" v-model="filterField['filter[min_sp_def]']" />
        </div>
        <div>
          <label for="sp_defMax">Enter max sp_def:</label>
          <input type="number" id="sp_defMax" v-model="filterField['filter[max_sp_def]']" />
        </div>
        <div>
          <label for="sp_atkMin">Enter min sp_atk:</label>
          <input type="number" id="sp_atkMin" v-model="filterField['filter[min_sp_atk]']" />
        </div>
        <div>
          <label for="sp_atkMax">Enter max sp_atk:</label>
          <input type="number" id="sp_atkMax" v-model="filterField['filter[max_sp_atk]']" />
        </div>
        <div>
          <label for="hpMin">Enter min hp:</label>
          <input type="number" id="hpMin" v-model="filterField['filter[min_hp]']" />
        </div>
        <div>
          <label for="hpMax">Enter max hp:</label>
          <input type="number" id="hpMax" v-model="filterField['filter[max_hp]']" />
        </div>
        <div>
          <label for="defenseMin">Enter min defense:</label>
          <input type="number" id="defenseMin" v-model="filterField['filter[min_defense]']" />
        </div>
        <div>
          <label for="defenseMax">Enter max defense:</label>
          <input type="number" id="defenseMax" v-model="filterField['filter[max_defense]']" />
        </div>
        <div>
          <label for="attackMin">Enter min attack:</label>
          <input type="number" id="attackMin" v-model="filterField['filter[min_attack]']" />
        </div>
        <div>
          <label for="attackMax">Enter max attack:</label>
          <input type="number" id="attackMax" v-model="filterField['filter[max_attack]']" />
        </div>
        <div
          class="errors"
          v-if="errorsList.length > 0"
          v-html="errorsList.map((item) => `<p>${item}</p>`).join('')"
        />
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
