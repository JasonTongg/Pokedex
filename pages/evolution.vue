<template>
  <div class="evolutionContainer">
    <h1>Evolution Chain</h1>
    <div class="pokemons">
      <div
        class="pokemon"
        v-for="(pokemon, index) in evolution"
        :key="index"
        @click="changeDetail(pokemon?.id)"
      >
        <h2>{{ pokemon?.name?.split("-")?.join(" ") }}</h2>
        <div class="image">
          <Icon name="arcticons:pokemongo" :color="color" />
          <img
            :src="pokemon.sprites?.other['official-artwork'].front_default"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

store.commit("setEvolutionPokemon", []);
store.dispatch("getDetailPokemon");

const evolution = computed(() => {
  return store.getters.getEvolutionPokemon;
});

const color = computed(() => {
  return store.getters.getDetailColor;
});

const changeDetail = (id: number) => {
  store.commit("setDetail", id);
  store.dispatch("getDetailPokemon");
  router.push("/");
};
</script>

<style lang="scss">
.evolutionContainer {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  width: 100%;

  .pokemons {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    height: 100%;

    .pokemon {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 1rem;
      cursor: pointer;

      .image {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          font-size: 20rem;
          opacity: 0.2;
        }

        img {
          width: 80%;
          max-width: 400px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      h2 {
        text-transform: capitalize;
      }
    }
  }
}
</style>
