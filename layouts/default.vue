<template>
  <div class="layoutContainer">
    <div class="logo">
      <img src="../assets/logo.png" alt="" />
    </div>
    <nav class="nav">
      <NuxtLink :to="{ name: 'search' }">Search</NuxtLink>
      <NuxtLink :to="{ name: 'index' }">Pokemon</NuxtLink>
      <NuxtLink :to="{ name: 'about' }">About</NuxtLink>
      <div class="popupNav" v-if="modal">
        <NuxtLink :to="{ name: 'search' }" @click="closeModal">Search</NuxtLink>
        <NuxtLink :to="{ name: 'index' }" @click="closeModal">Pokemon</NuxtLink>
        <NuxtLink :to="{ name: 'about' }" @click="closeModal">About</NuxtLink>
        <Icon
          name="material-symbols:cancel-presentation-rounded"
          @click="closeModal"
        ></Icon>
      </div>
    </nav>
    <div class="burgerMenu">
      <Icon
        name="iconamoon:menu-burger-horizontal-bold"
        color="white"
        @click="openModal"
      ></Icon>
    </div>
    <div class="empty"></div>
    <div class="content">
      <slot />
    </div>
    <div class="empty"></div>
    <div class="logo2"></div>
    <nav class="nav2">
      <NuxtLink to="/">Description</NuxtLink>
      <NuxtLink to="/evolution">Evolution</NuxtLink>
      <NuxtLink to="/moves">Capable Moves</NuxtLink>
      <div class="popupNav2">
        <NuxtLink to="/">Description</NuxtLink>
        <NuxtLink to="/evolution">Evolution</NuxtLink>
        <NuxtLink to="/moves">Capable Moves</NuxtLink>
      </div>
    </nav>
    <div class="shutdown">
      <Icon name="ri:shut-down-line" color="red" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

const store = useStore();

const color = computed(() => {
  return store.getters.getDetailColor;
});

const fontColor = computed(() => {
  return store.getters.getDetailColor === "white" ? "black" : "white";
});

const modal = ref<boolean>(false);

const openModal = () => {
  modal.value = true;
};

const closeModal = () => {
  modal.value = false;
};
</script>

<style lang="scss">
.layoutContainer {
  min-height: 100vh;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.97),
      rgba(0, 0, 0, 0.97)
    ),
    url("../assets/Background.png");
  background-size: cover;
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  grid-template-rows: 70px 1fr 70px;
  overflow-x: hidden;

  @media only screen and (max-width: 797px) {
    grid-template-rows: 70px 1fr;
    grid-template-columns: 100px 1fr 100px;
  }

  @media only screen and (max-width: 800px) {
    grid-template-rows: 50px 1fr;
  }

  .logo,
  .nav,
  .burgerMenu,
  .empty,
  .shutdown,
  .nav2,
  .logo2 {
    width: 100%;
    height: 100%;
    border: 1px solid rgb(62, 62, 62);
  }

  .nav,
  .nav2 {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-inline: 5rem;

    @media only screen and (max-width: 915px) {
      padding-inline: 2rem;
    }

    @media only screen and (max-width: 665px) {
      padding-inline: 0.5rem;
    }

    a {
      padding-inline: 2rem;
      list-style: none;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
      font-size: 1.1rem;
      letter-spacing: 8px;
      text-decoration: none;
      color: white;
      transition: all 0.5s linear;
      text-align: center;

      @media only screen and (max-width: 915px) {
        padding-inline: 1rem;
        font-size: 0.8rem;
      }

      @media only screen and (max-width: 665px) {
        padding-inline: 0.5rem;
      }
    }

    a.router-link-active {
      border-bottom: 1px solid v-bind(color);
    }
  }

  .nav {
    .popupNav {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      color: white;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      & > * {
        font-size: 3rem;
        text-transform: uppercase;
        color: white;
        height: auto;
        cursor: pointer;

        @media only screen and (max-width: 450px) {
          font-size: 2rem;
        }
      }

      svg {
        position: absolute;
        right: 50px;
        top: 50px;
        cursor: pointer;
      }

      @media only screen and (max-width: 567px) {
        display: flex;
      }
    }

    & > a {
      @media only screen and (max-width: 567px) {
        display: none;
        border: none;
      }
    }
  }
  .nav2 {
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
    width: 100%;

    .popupNav2 {
      display: none;
      position: fixed;
      width: 80vw;
      padding: 1rem 2rem;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.8);
      justify-content: center;
      align-items: center;
      gap: 1rem;
      border-radius: 20px;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));

      & > a {
        padding: 1rem 0.5rem;
      }

      @media only screen and (max-width: 797px) {
        display: grid;
      }

      @media only screen and (max-width: 797px) {
        width: 95vw;
      }
    }

    & > a {
      @media only screen and (max-width: 797px) {
        display: none;
      }
      &.router-link-active {
        border: none;
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

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: calc(100% - 40px);
      height: auto;
      object-fit: cover;

      @media only screen and (max-width: 800px) {
        width: calc(100% - 60px);
      }
    }
  }

  .shutdown,
  .burgerMenu {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      font-size: 3.5rem;

      @media only screen and (max-width: 800px) {
        font-size: 2rem;
      }
    }
  }

  .burgerMenu {
    svg {
      display: none;
      @media only screen and (max-width: 567px) {
        display: block;
      }
    }
  }

  .shutdown,
  .logo2,
  .empty {
    @media only screen and (max-width: 797px) {
      display: none;
      border: none;
    }
  }

  .content {
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.07),
      rgba(255, 255, 255, 0.07)
    );
    @media only screen and (max-width: 797px) {
      grid-column: 1/-1;
    }
  }
}
</style>
