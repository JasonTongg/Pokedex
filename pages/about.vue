<template>
  <div class="aboutContainer">
    <img src="../assets/Profile.jfif" alt="Profile Picture" />
    <h1>Jason</h1>
    <p>
      Hello, My name is Jason. I was born in Tanjung Balai Karimun, 27th March
      2002. Currently still studying at Binus University taking a Computer
      Science and Mathematics major. I have passionate about Website Development
      especially Front-end and Back-end Developer. Currently, my focus is to
      create as many portfolios as possible that can increase my knowledge in
      this field and also for my future self-development
    </p>
    <div class="sosmed">
      <NuxtLink to="https://www.instagram.com/tongchenyi_/" target="_blank">
        <Icon name="bi:instagram" :color="color"></Icon>
      </NuxtLink>
      <NuxtLink
        to="https://www.linkedin.com/in/jason-tong-42600319a/"
        target="_blank"
      >
        <Icon name="bi:linkedin" :color="color"></Icon>
      </NuxtLink>
      <NuxtLink to="https://github.com/JasonTongg" target="_blank">
        <Icon name="bi:github" :color="color"></Icon>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

const store = useStore();

const color = computed(() => {
  return store.getters.getDetailColor;
});
</script>

<style lang="scss">
.aboutContainer {
  color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;

  img {
    border-radius: 50%;
    border: 5px solid v-bind(color);
    width: 250px;
    padding: 0.5rem;
  }

  h1 {
    font-size: 4rem;
  }

  p {
    width: 50%;
    text-align: justify;

    @media only screen and (max-width: 800px) {
      width: 70%;
    }
    @media only screen and (max-width: 500px) {
      width: 90%;
    }
  }

  .sosmed {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    & > * {
      font-size: 3rem;
      cursor: pointer;
    }
  }
}
</style>
