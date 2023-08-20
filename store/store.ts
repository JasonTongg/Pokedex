import { createStore } from 'vuex'

export const store = createStore({
  state () {
    return {
      detail: 6,
      detailPokemon: {},
      detailPokemonSpecies: {},
      detailEvolutionChain: {},
      pokemons: [] as Array<Object>,
      allPokemons: [] as Array<Object>,
    }
  },
  mutations: {
    setDetail(state, payload) {
      state.detail = payload;
    },
    setDetailPokemon(state, payload) {
      state.detailPokemon = payload;
    },
    setPokemonDetailSpecies(state, payload) {
      state.detailPokemonSpecies = payload;
    },
    setEvolutionChain(state, payload) {
      state.detailEvolutionChain = payload;
    },
    setPokemons(state, payload) {
      state.pokemons = payload;
    },
    addPokemons(state, payload) {
      state.pokemons = [...state.pokemons, payload]
    },
    setAllPokemons(state, payload) {
      state.allPokemons = payload;
    }
  },
  getters: {
    getDetails(state) {
      return state.detail;
    },
    getDetailPokemon(state) {
      return state.detailPokemon;
    },
    getDetailPokemonSpecies(state) {
      return state.detailPokemonSpecies;
    },
    getDetailEvolutionChain(state) {
      return state.detailEvolutionChain;
    },
    getPokemons(state) {
      return state.pokemons;
    },
    getAllPokemons(state) {
      return state.allPokemons
    }
  },
  actions: {
    async getDetailPokemon(context, payload) {
      let rawData = await fetch(payload ? payload : `https://pokeapi.co/api/v2/pokemon/${context.state.detail}`);
      let data = await rawData.json();
      context.commit("setDetailPokemon", data);
      context.dispatch("getPokemonSpecies");
    },
    async getPokemonSpecies(context) {
      let rawData = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${context.state.detail}`);
      let data = await rawData.json();
      context.commit("setPokemonDetailSpecies", data);
      context.dispatch("getPokemonEvolutionChain")
    },
    async getPokemonEvolutionChain(context) {
      let rawData = await fetch(context.getters.getDetailPokemonSpecies.evolution_chain.url);
      let data = await rawData.json();
      context.commit("setEvolutionChain", data);
    },
    async getPokemons(context) {
      if (context.state.pokemons.length <= 0) {
        let rawData = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1281");
        let data = await rawData.json();
        let random = [];
        for (let i = 0; i < 15; i++){
          random.push(Math.floor(Math.random() * 1281))
        }
        random.forEach((element: number) => {
          context.dispatch("getPokemon", data.results[element].url)
        });
        context.commit("setAllPokemons", data)
      }
    },
    async getPokemon(context, payload) {
      let rawData = await fetch(payload);
      let data = await rawData.json();
      context.commit("addPokemons", data);
    }
  }
})