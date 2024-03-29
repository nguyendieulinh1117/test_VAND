<script setup lang="ts">
import type { PokemonType, CategoryType } from '../types';
import { renderStyleType, renderType } from '../utils';
defineProps<{
  pokemon: PokemonType;
  handleView: (id: string) => void;
  pokemonType: CategoryType[];
}>();
</script>

<template>
  <h3>{{ pokemon.name }}</h3>
  <p>Number: {{ pokemon.number }}</p>
  <p class="type">
    Type:
    <strong
      v-html="renderType(pokemon.type_1, pokemon.type_2, pokemonType, renderStyleType)"
    ></strong>
  </p>
  <p>Total: {{ pokemon.total }}</p>
  <button class="btn" @click="handleView(pokemon.id)">View more</button>
</template>
