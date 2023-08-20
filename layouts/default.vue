<template>
  <div class="layoutContainer">
    <div class="logo">
      <img src="../assets/logo.png" alt="" />
    </div>
    <nav class="nav">
      <NuxtLink :to="{ name: 'search' }">Search</NuxtLink>
      <NuxtLink :to="{ name: 'index' }">Pokemon</NuxtLink>
      <NuxtLink>About</NuxtLink>
    </nav>
    <div class="burgerMenu">
      <Icon name="iconamoon:menu-burger-horizontal-bold" color="white"></Icon>
    </div>
    <div class="empty"></div>
    <div class="content">
      <slot />
    </div>
    <div class="empty"></div>
    <div class="logo"></div>
    <nav class="nav2">
      <NuxtLink to="/">Description</NuxtLink>
      <NuxtLink to="/evolution">Evolution</NuxtLink>
      <NuxtLink to="/moves">Capable Moves</NuxtLink>
    </nav>
    <div class="shutdown">
      <Icon name="ri:shut-down-line" color="red" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.layoutContainer {
  min-height: 100vh;
  width: 100vw;
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

  .logo,
  .nav,
  .burgerMenu,
  .empty,
  .shutdown,
  .nav2 {
    width: 100%;
    height: 100%;
    // background-color: red;
    border: 1px solid rgb(62, 62, 62);
  }

  .nav,
  .nav2 {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-inline: 5rem;

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
    }

    a.router-link-active {
      border-bottom: 1px solid rgb(101, 101, 101);
    }
  }

  .nav2 {
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    width: 100%;

    a.router-link-active {
      border: none;
      background-color: rgb(101, 101, 101);
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
    }
  }

  .shutdown,
  .burgerMenu {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      font-size: 3.5rem;
    }
  }

  .content {
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.07),
      rgba(255, 255, 255, 0.07)
    );
  }
}
</style>
