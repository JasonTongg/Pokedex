<template #default>
  <div class="detailContainer" v-if="detailPokemon!! && detailSpecies!!">
    <div class="left">
      <div class="profile">
        <h1>{{ detailPokemon?.name?.split("-")?.join(" ") }}</h1>
        <h3 v-if="detailSpecies?.habitat?.name">
          Habitat: {{ detailSpecies?.habitat?.name }}
        </h3>
        <h3>
          Type:
          <span v-for="(type, index) in detailPokemon.types" :key="index">
            {{
              index + 1 === detailPokemon.types?.length
                ? type.type.name
                : type.type.name + " - "
            }}</span
          >
        </h3>
      </div>
      <div class="stats">
        <div
          class="stat"
          v-for="(stat, index) in detailPokemon.stats"
          :key="index"
        >
          <p>{{ stat.stat.name }}: {{ stat.base_stat }}</p>
          <div
            class="bar"
            :style="{
              width: stat.base_stat > 100 ? 100 + '%' : stat.base_stat + '%',
            }"
          ></div>
        </div>
      </div>
    </div>
    <div class="pokemon">
      <Icon name="arcticons:pokemongo" :color="color" />
      <img
        :src="detailPokemon.sprites?.other['official-artwork'].front_default"
        alt=""
      />
    </div>
    <div class="right">
      <div class="varieties">
        <h1>Varieties</h1>
        <div
          class="variety"
          v-for="(variety, index) in detailSpecies.varieties"
          :key="index"
          v-if="detailSpecies?.varieties?.length > 0"
        >
          <h3>{{ variety.pokemon.name.split("-").join(" ") }}</h3>
          <button @click="changeDetail(variety.pokemon.url)">See Detail</button>
        </div>
        <p v-else>No Other Varieties</p>
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

const detailSpecies = computed(() => {
  return store.getters.getDetailPokemonSpecies;
});

const changeDetail = (url: string) => {
  store.dispatch("getDetailPokemon", url);
};

const color = computed(() => {
  return store.getters.getDetailColor;
});
</script>

<style lang="scss">
.detailContainer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 1rem;
  width: 100%;
  height: 100%;
  gap: 1rem;
  color: white;

  & > * {
    width: 100%;
    height: 100%;
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;

    .varieties {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 1rem;

      .variety {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;

        h3 {
          text-transform: capitalize;
        }

        button {
          border: 1px solid v-bind(color);
          outline: none;
          cursor: pointer;
          border-radius: 200px;
          padding: 0.3rem 0.5rem;
          background-color: transparent;
          color: v-bind(color);
        }
      }
    }
  }

  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    padding: 1rem;

    .stats {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      width: 100%;

      .stat {
        display: grid;
        width: 100%;
        grid-template-columns: 1fr 1.2fr;
        gap: 1rem;
        align-items: center;

        p {
          justify-self: right;
          text-transform: capitalize;
        }

        .bar {
          height: 8px;
          border-radius: 200px;
          opacity: 0.3;
          background-image: linear-gradient(
            to bottom,
            v-bind(color),
            v-bind(color)
          );
        }
      }
    }

    .profile {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: rgb(52, 51, 51);
      width: 100%;
      padding: 1rem;
      gap: 0.3rem;

      h1 {
        font-size: 3rem;
        text-align: center;
        text-transform: capitalize;
      }

      & > * {
        text-transform: capitalize;
      }
    }
  }

  .pokemon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    svg {
      font-size: 25rem;
      opacity: 0.2;
    }

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
    }
  }
}
</style>
