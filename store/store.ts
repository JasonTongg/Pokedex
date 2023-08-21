import { createStore } from 'vuex'

// interface IState {
//   detail: number,
//   detailPokemon: Object,
//   detailPokemonSpecies: Object,
//   detailEvolutionChain: Object,
//   pokemons: Array<Object>,
//   allPokemons: Array<Object>,
//   detailColor: string
// }

export const store = createStore({
  state () {
    return {
      detail: 6,
      detailPokemon: {},
      detailPokemonSpecies: {},
      pokemons: [] as Array<Object>,
      allPokemons: [] as Array<Object>,
      detailColor: "",
      evolutionChain: [] as Array<Object>,
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
    setPokemons(state, payload) {
      state.pokemons = payload;
    },
    addPokemons(state, payload) {
      state.pokemons = [...state.pokemons, payload]
    },
    setAllPokemons(state, payload) {
      state.allPokemons = payload;
    },
    setDetailColor(state, payload) {
      state.detailColor = payload;
    },
    addEvolutionPokemon(state, payload) {
      state.evolutionChain = [...state.evolutionChain, payload];
    },
    setEvolutionPokemon(state, payload) {
      state.evolutionChain = payload;
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
    getPokemons(state) {
      return state.pokemons;
    },
    getAllPokemons(state) {
      return state.allPokemons
    },
    getDetailColor(state) {
      return state.detailColor;
    },
    getEvolutionPokemon(state) {
      return state.evolutionChain;
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
      if (!rawData.ok) {
        context.commit("setPokemonDetailSpecies", {});
        context.commit("setDetailColor", "white")
      }
      else {
        let data = await rawData.json();
        context.commit("setPokemonDetailSpecies", data);
        context.commit("setDetailColor", data.color.name === "black" ? "white" : data.color.name)
        context.dispatch("getPokemonEvolutionChain")
      }
    },
    async getPokemonEvolutionChain(context) {
      let rawData = await fetch(context.getters.getDetailPokemonSpecies.evolution_chain.url);
      let data = await rawData.json();
      let names = []
      names = [data.chain.species.name]
      let temp = data.chain;
      while (true) {
        if (temp?.evolves_to) {
          temp = temp?.evolves_to[0];
          names = [...names, temp?.species?.name];
        }
        else {
          break;
        }
      }

      names.pop()
      names.forEach(item => {
        context.dispatch("getEvolutionPokemon", item);
      })
    },
    async getEvolutionPokemon(context, payload) {
      let rawData = await fetch(`https://pokeapi.co/api/v2/pokemon/${payload}`);
      let data = await rawData.json();
      context.commit("addEvolutionPokemon", data);
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