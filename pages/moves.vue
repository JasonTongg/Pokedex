<template>
  <div class="movesContainer">
    <div class="abilitiesContainer">
      <h1>ABILITIES</h1>
      <div class="abilities">
        <div
          class="ability"
          v-for="(ability, index) in detailPokemon?.abilities"
          :key="index"
        >
          {{ ability.ability.name }}
        </div>
      </div>
    </div>
    <div class="moveContainer">
      <h1>MOVES</h1>
      <div class="moves">
        <div
          class="move"
          v-for="(move, index) in detailPokemon?.moves.slice(0, limit)"
          :key="index"
        >
          {{ move.move.name }}
        </div>
        <div
          class="move more"
          v-if="detailPokemon?.moves?.length >= 20 && limit === 19"
          @click="upLimit"
        >
          See All...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

const store = useStore();

store.commit("setEvolutionPokemon", []);
store.dispatch("getDetailPokemon");

const detailPokemon = computed(() => {
  return store.getters.getDetailPokemon;
});

const color = computed(() => {
  return store.getters.getDetailColor;
});

const fontColor = computed(() => {
  return store.getters.getDetailColor === "white" ? "black" : "white";
});

let limit = ref<number>(19);

const upLimit = () => {
  limit.value = 100;
};
</script>

<style lang="scss">
.movesContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  padding: 2rem;
  color: white;

  .abilitiesContainer,
  .moveContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;

    .abilities,
    .moves {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      text-align: center;
      width: 100%;
      gap: 1rem;

      .move,
      .ability {
        font-size: 1.3rem;
        padding-block: 3rem;
        border-radius: 20px;
        width: 230px;
      }

      .move {
        background-color: rgba(white, 0.1);
      }

      .move.more {
        cursor: pointer;
      }

      .ability {
        background-image: linear-gradient(
            to bottom,
            rgb(rgb(156, 156, 156), 0.4),
            rgb(rgb(156, 156, 156), 0.4)
          ),
          linear-gradient(to bottom, v-bind(color), v-bind(color));
        color: v-bind(fontColor);
      }
    }
  }
}
</style>
