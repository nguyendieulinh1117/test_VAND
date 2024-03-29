<script setup lang="ts">
import type { CategoryType, PokemonType } from '@/types';
import { renderStyleType, renderType } from '@/utils';

defineProps<{
  show: Boolean;
  handleClose: () => void;
  pokemonSprite?: string;
  pokemonDetail?: PokemonType;
  pokemonType: CategoryType[];
}>();
</script>

<template>
  <div class="modal" :class="{ open: show }">
    <div class="modal-content">
      <button class="close" @click="handleClose">&times;</button>
      <div v-if="pokemonDetail">
        <h2>{{ pokemonDetail.name }}</h2>
        <div class="info">
          <img v-if="pokemonSprite" :src="pokemonSprite" :alt="pokemonDetail.name" />
          <div class="attribute">
            <p>Number: {{ pokemonDetail.number }}</p>
            <p class="type">
              Type:
              <strong
                v-html="
                  renderType(
                    pokemonDetail.type_1,
                    pokemonDetail.type_2,
                    pokemonType,
                    renderStyleType
                  )
                "
              />
            </p>
            <div class="grid-2-cols">
              <p>HP: {{ pokemonDetail.hp }}</p>
              <p>Speed: {{ pokemonDetail.speed }}</p>
              <p>Attack: {{ pokemonDetail.attack }}</p>
              <p>Defense: {{ pokemonDetail.defense }}</p>
              <p>Sp_atk: {{ pokemonDetail.sp_atk }}</p>
              <p>Sp_def: {{ pokemonDetail.sp_def }}</p>
            </div>
            <p class="total">
              <strong>Total: {{ pokemonDetail.total }}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
@import '../assets/modal.css';
</style>
