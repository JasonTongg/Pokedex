<template #default>
  <div class="searchContainer">
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Search Pokemon..." v-model="search" />
    </form>
    <div class="items">
      <div
        class="item"
        v-for="(pokemon, index) in pokemons"
        @click="changeDetail(pokemon.id)"
        :key="index"
      >
        <h2>{{ pokemon?.name?.split("-")?.join(" ") }}</h2>
        <img
          :src="pokemon.sprites?.other['official-artwork'].front_default"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

store.dispatch("getPokemons");

const pokemons = computed<
  [
    {
      id: number;
      name: string;
      sprites: { other: { ["official-artwork"]: { front_default: string } } };
    }
  ]
>(() => {
  return store.getters.getPokemons;
});

const allPokemons = computed<{ results: [{ name: string; url: string }] }>(
  () => {
    return store.getters.getAllPokemons;
  }
);

console.log(pokemons.value);

const search = ref<string>("");
const filterPokemon = ref<Array<{ name: string; url: string }>>();

const handleSubmit = () => {
  filterPokemon.value = allPokemons.value.results.filter((item) =>
    item.name.includes(search.value)
  );
  store.commit("setPokemons", []);
  filterPokemon.value.forEach((element) => {
    store.dispatch("getPokemon", element.url);
  });
};

const changeDetail = (id: number) => {
  store.commit("setDetail", id);
  router.push("/");
};
</script>

<style lang="scss">
.searchContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: white;

  form {
    width: 100%;
    input {
      width: 100%;
      padding: 0.3rem 1rem;
      background-color: rgba(white, 0.1);
      border: none;
      outline: none;
      height: 50px;
      font-size: 1.2rem;
      color: white;
    }
  }

  .items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    padding: 2rem;
    width: 100%;

    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: rgba(white, 0.1);
      border-radius: 20px;
      padding: 1rem;
      cursor: pointer;
      gap: 1rem;

      img {
        width: 80%;
      }

      h2 {
        text-align: center;
        text-transform: capitalize;
      }
    }
  }
}
</style>
