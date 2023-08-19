<template>search: {{ search }}</template>

<script setup lang="ts">
const route = useRoute();
const search = ref(route.params.search);
</script>

<style lang="scss"></style>
