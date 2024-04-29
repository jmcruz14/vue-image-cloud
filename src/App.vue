
<template>
  <h1>Word Cloud Component</h1>
  <WordCloud 
    :imageUrls="imageUrls"
    :left-multiplier="80"
    :top-multiplier="40"
  />
</template>

<script setup>
import { ref } from 'vue'
import WordCloud from './components/WordCloud.vue'

// source is not resolved with the alias
const imageUrls = ref([
    'src/assets/css.png',
    'src/assets/git.png',
    'src/assets/html.png',
    // Add more image URLs as needed
])

</script>

<style>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
