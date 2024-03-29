<script setup lang="ts">
import { ref } from 'vue';
import type { ParamsListType } from '../types';
import { ERROR_FIELDS } from '../utils/contants';
import { isGreaterThanOrEqual, checkNotNullOrEmpty } from '../utils';
const props = defineProps<{
  filterField: ParamsListType;
  onFilter: Function;
  onRefresh: Function
}>();
const errorsList = ref<string[]>([]);
const errorFields = ref({ ...ERROR_FIELDS });

const validateForm = () => {
  const errors: string[] = [];
  //check inputs have value or not
  if (
    !checkNotNullOrEmpty(props.filterField['filter[max_total]']) &&
    !checkNotNullOrEmpty(props.filterField['filter[min_total]']) &&
    !checkNotNullOrEmpty(props.filterField['filter[max_speed]']) &&
    !checkNotNullOrEmpty(props.filterField['filter[min_speed]']) &&
    !checkNotNullOrEmpty(props.filterField['filter[max_sp_def]']) &&
    !checkNotNullOrEmpty(props.filterField['filter[min_sp_def]']) &&
    !checkNotNullOrEmpty(props.filterField['filter[max_sp_atk]']) &&
    !checkNotNullOrEmpty(props.filterField['filter[min_sp_atk]']) &&
    !checkNotNullOrEmpty(props.filterField['filter[max_hp]']) &&
    !checkNotNullOrEmpty(props.filterField['filter[min_hp]']) &&
    !checkNotNullOrEmpty(props.filterField['filter[max_defense]']) &&
    !checkNotNullOrEmpty(props.filterField['filter[min_defense]']) &&
    !checkNotNullOrEmpty(props.filterField['filter[max_attack]']) &&
    !checkNotNullOrEmpty(props.filterField['filter[min_attack]'])
  ) {
    errors.push('Enter at least one input to filter');
    errorFields.value = {
      min_total: true,
      max_total: true,
      min_speed: true,
      max_speed: true,
      min_sp_def: true,
      max_sp_def: true,
      max_sp_atk: true,
      min_sp_atk: true,
      max_hp: true,
      min_hp: true,
      max_defense: true,
      min_defense: true,
      max_attack: true,
      min_attack: true
    };
  }

  // check total
  if (!isGreaterThanOrEqual(props.filterField['filter[min_total]'], 180)) {
    errors.push('Min total must be greater than or equal 180');
    errorFields.value.min_total = true;
  }

  if (!isGreaterThanOrEqual(770, props.filterField['filter[min_total]'])) {
    errors.push('Min total must be less than or equal 770');
    errorFields.value.min_total = true;
  }

  if (!isGreaterThanOrEqual(props.filterField['filter[max_total]'], 180)) {
    errors.push('Max total must be greater than or equal 180');
    errorFields.value.max_total = true;
  }
  if (!isGreaterThanOrEqual(770, props.filterField['filter[max_total]'])) {
    errors.push('Max total must be less than or equal 770');
    errorFields.value.max_total = true;
  }

  if (
    !isGreaterThanOrEqual(
      props.filterField['filter[max_total]'],
      props.filterField['filter[min_total]']
    )
  ) {
    errors.push('Max total must be greater than or equal Min total');
    errorFields.value.min_total = true;
    errorFields.value.max_total = true;
  }

  //check speed
  if (!isGreaterThanOrEqual(props.filterField['filter[min_speed]'], 5)) {
    errors.push('Min speed must be greater than or equal 5');
    errorFields.value.min_speed = true;
  }
  if (!isGreaterThanOrEqual(180, props.filterField['filter[min_speed]'])) {
    errors.push('Min speed must be less than or equal 180');
    errorFields.value.min_speed = true;
  }

  if (!isGreaterThanOrEqual(props.filterField['filter[max_speed]'], 5)) {
    errors.push('Max speed must be greater than or equal 5');
    errorFields.value.max_speed = true;
  }
  if (!isGreaterThanOrEqual(180, props.filterField['filter[max_speed]'])) {
    errors.push('Max speed must be less than or equal 180');
    errorFields.value.max_speed = true;
  }

  if (
    !isGreaterThanOrEqual(
      props.filterField['filter[max_speed]'],
      props.filterField['filter[min_speed]']
    )
  ) {
    errors.push('Max speed must be greater than or equal Min speed');
    errorFields.value.min_speed = true;
    errorFields.value.max_speed = true;
  }

  //check sp_def
  if (!isGreaterThanOrEqual(props.filterField['filter[min_sp_def]'], 20)) {
    errors.push('Min sp_def must be greater than or equal 20');
    errorFields.value.min_sp_def = true;
  }
  if (!isGreaterThanOrEqual(230, props.filterField['filter[min_sp_def]'])) {
    errors.push('Min sp_def must be less than or equal 230');
    errorFields.value.min_sp_def = true;
  }

  if (!isGreaterThanOrEqual(props.filterField['filter[max_sp_def]'], 20)) {
    errors.push('Max sp_def must be greater than or equal 20');
    errorFields.value.max_sp_def = true;
  }
  if (!isGreaterThanOrEqual(230, props.filterField['filter[max_sp_def]'])) {
    errors.push('Max sp_def must be less than or equal 230');
    errorFields.value.max_sp_def = true;
  }

  if (
    !isGreaterThanOrEqual(
      props.filterField['filter[max_sp_def]'],
      props.filterField['filter[min_sp_def]']
    )
  ) {
    errors.push('Max sp_def must be greater than or equal Min sp_def');
    errorFields.value.min_sp_def = true;
    errorFields.value.max_sp_def = true;
  }

  //check sp_atk
  if (!isGreaterThanOrEqual(props.filterField['filter[min_sp_atk]'], 10)) {
    errors.push('Min sp_atk must be greater than or equal 10');
    errorFields.value.min_sp_atk = true;
  }
  if (!isGreaterThanOrEqual(180, props.filterField['filter[min_sp_atk]'])) {
    errors.push('Min sp_atk must be less than or equal 180');
    errorFields.value.min_sp_atk = true;
  }

  if (!isGreaterThanOrEqual(props.filterField['filter[max_sp_atk]'], 10)) {
    errors.push('Max sp_atk must be greater than or equal 10');
    errorFields.value.max_sp_atk = true;
  }
  if (!isGreaterThanOrEqual(180, props.filterField['filter[max_sp_atk]'])) {
    errors.push('Max sp_atk must be less than or equal 180');
    errorFields.value.max_sp_atk = true;
  }

  if (
    !isGreaterThanOrEqual(
      props.filterField['filter[max_sp_atk]'],
      props.filterField['filter[min_sp_atk]']
    )
  ) {
    errors.push('Max sp_atk must be greater than or equal Min sp_atk');
    errorFields.value.min_sp_atk = true;
    errorFields.value.max_sp_atk = true;
  }

  //check hp
  if (!isGreaterThanOrEqual(props.filterField['filter[min_hp]'], 1)) {
    errors.push('Min hp must be greater than or equal 1');
    errorFields.value.min_hp = true;
  }
  if (!isGreaterThanOrEqual(225, props.filterField['filter[min_hp]'])) {
    errors.push('Min hp must be less than or equal 225');
    errorFields.value.min_hp = true;
  }

  if (!isGreaterThanOrEqual(props.filterField['filter[max_hp]'], 1)) {
    errors.push('Max hp must be greater than or equal 1');
    errorFields.value.max_hp = true;
  }
  if (!isGreaterThanOrEqual(225, props.filterField['filter[max_hp]'])) {
    errors.push('Max hp must be less than or equal 225');
    errorFields.value.max_hp = true;
  }

  if (
    !isGreaterThanOrEqual(props.filterField['filter[max_hp]'], props.filterField['filter[min_hp]'])
  ) {
    errors.push('Max hp must be greater than or equal Min hp');
    errorFields.value.min_hp = true;
    errorFields.value.max_hp = true;
  }

  //check defense
  if (!isGreaterThanOrEqual(props.filterField['filter[min_defense]'], 5)) {
    errors.push('Min defense must be greater than or equal 5');
    errorFields.value.min_defense = true;
  }
  if (!isGreaterThanOrEqual(230, props.filterField['filter[min_defense]'])) {
    errors.push('Min defense must be less than or equal 230');
    errorFields.value.min_defense = true;
  }

  if (!isGreaterThanOrEqual(props.filterField['filter[max_defense]'], 5)) {
    errors.push('Max defense must be greater than or equal 5');
    errorFields.value.max_defense = true;
  }
  if (!isGreaterThanOrEqual(230, props.filterField['filter[max_defense]'])) {
    errors.push('Max defense must be less than or equal 230');
    errorFields.value.min_defense = true;
  }

  if (
    !isGreaterThanOrEqual(
      props.filterField['filter[max_defense]'],
      props.filterField['filter[min_defense]']
    )
  ) {
    errors.push('Max defense must be greater than or equal Min defense');
    errorFields.value.min_defense = true;
    errorFields.value.max_defense = true;
  }

  //check attack
  if (!isGreaterThanOrEqual(props.filterField['filter[min_attack]'], 5)) {
    errors.push('Min attack must be greater than or equal 5');
    errorFields.value.min_attack = true;
  }
  if (!isGreaterThanOrEqual(180, props.filterField['filter[min_attack]'])) {
    errors.push('Min attack must be less than or equal 180');
    errorFields.value.min_attack = true;
  }

  if (!isGreaterThanOrEqual(props.filterField['filter[max_attack]'], 5)) {
    errors.push('Max attack must be greater than or equal 5');
    errorFields.value.max_attack = true;
  }
  if (!isGreaterThanOrEqual(180, props.filterField['filter[max_attack]'])) {
    errors.push('Max attack must be less than or equal 180');
    errorFields.value.max_attack = true;
  }

  if (
    !isGreaterThanOrEqual(
      props.filterField['filter[max_attack]'],
      props.filterField['filter[min_attack]']
    )
  ) {
    errors.push('Max attack must be greater than or equal Min total');
    errorFields.value.min_attack = true;
    errorFields.value.max_attack = true;
  }

  return errors;
};

const handleSubmit = () => {
  errorsList.value = [];
  errorFields.value = { ...ERROR_FIELDS };

  const errors = validateForm();

  if (errors.length > 0) {
    errorsList.value = errors;
    return;
  }

  props.onFilter();
};

const handleRefresh = () => {
  errorsList.value = [];
  errorFields.value = { ...ERROR_FIELDS };
  props.onRefresh()
}
</script>
<template>
  <form class="filterForm" @submit.prevent="handleSubmit">
    <div class="group-input">
      <label>Range of total:</label>
      <p>
        <span
          >Min:
          <input
            :class="{ error: errorFields.min_total }"
            type="number"
            v-model="filterField['filter[min_total]']"
        /></span>

        <span
          >Max:
          <input
            :class="{ error: errorFields.max_total }"
            type="number"
            v-model="filterField['filter[max_total]']"
        /></span>
      </p>
    </div>
    <div class="group-input">
      <label>Range of speed:</label>
      <p>
        <span
          >Min:
          <input
            :class="{ error: errorFields.min_speed }"
            type="number"
            v-model="filterField['filter[min_speed]']"
        /></span>

        <span
          >Max:
          <input
            :class="{ error: errorFields.max_speed }"
            type="number"
            v-model="filterField['filter[max_speed]']"
        /></span>
      </p>
    </div>
    <div class="group-input">
      <label>Range of sp_def:</label>
      <p>
        <span
          >Min:
          <input
            :class="{ error: errorFields.min_sp_def }"
            type="number"
            v-model="filterField['filter[min_sp_def]']"
        /></span>

        <span
          >Max:
          <input
            :class="{ error: errorFields.max_sp_def }"
            type="number"
            v-model="filterField['filter[max_sp_def]']"
        /></span>
      </p>
    </div>

    <div class="group-input">
      <label>Range of sp_atk:</label>
      <p>
        <span
          >Min:
          <input
            :class="{ error: errorFields.min_sp_atk }"
            type="number"
            v-model="filterField['filter[min_sp_atk]']"
          />
        </span>

        <span
          >Max:
          <input
            :class="{ error: errorFields.max_sp_atk }"
            type="number"
            v-model="filterField['filter[max_sp_atk]']"
        /></span>
      </p>
    </div>
    <div class="group-input">
      <label>Rang of HP:</label>
      <p>
        <span
          >Min:
          <input
            :class="{ error: errorFields.min_hp }"
            type="number"
            v-model="filterField['filter[min_hp]']"
        /></span>

        <span
          >Max:
          <input
            :class="{ error: errorFields.max_hp }"
            type="number"
            v-model="filterField['filter[max_hp]']"
        /></span>
      </p>
    </div>
    <div class="group-input">
      <label>Range of defense:</label>
      <p>
        <span
          >Min:
          <input
            :class="{ error: errorFields.min_defense }"
            type="number"
            v-model="filterField['filter[min_defense]']"
        /></span>

        <span
          >Max:
          <input
            :class="{ error: errorFields.max_defense }"
            type="number"
            v-model="filterField['filter[max_defense]']"
        /></span>
      </p>
    </div>
    <div class="group-input">
      <label>Range of attack:</label>
      <p>
        <span
          >Min:
          <input
            :class="{ error: errorFields.min_attack }"
            type="number"
            v-model="filterField['filter[min_attack]']"
          />
        </span>

        <span>
          Max:
          <input
            :class="{ error: errorFields.max_attack }"
            type="number"
            v-model="filterField['filter[max_attack]']"
          />
        </span>
      </p>
    </div>
    <ul
      class="errors"
      v-if="errorsList.length > 0"
      v-html="errorsList.map((item) => `<li>${item}</li>`).join('')"
    />
    <div class="wrapper-btn">
      <button class="filter" type="submit">Filter</button>
      <button @click="handleRefresh" type="button">Refresh</button>
    </div>
  </form>
</template>
<style>
@import '../assets/form.css';
</style>
