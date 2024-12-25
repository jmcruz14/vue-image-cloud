
<template>
  <h1>Word Cloud Component</h1>

  <section>
    <h3 style="padding: 0; margin: 0;">About</h3>
    <p style="padding: 0; margin: 0; margin-bottom: 1em ">
      The Vue Image Cloud package is a fun, little Vue package for mixing together <br>
      images within a bounded box. This is just a little demo section where you can play <br>
      with the features/concepts being tested with the Image Cloud package.
    </p>
  </section>

  <section style="display: flex; flex-direction: row-reverse; gap: 5px;">
    <a style="text-decoration: none; color: white" href="https://github.com/jmcruz14/vue-image-cloud" target="_blank">GitHub</a>
  </section>

  <br>

  <ImageCloud 
    :imageUrls="imageUrls"
    :left-multiplier="80"
    :top-multiplier="40"
  />
</template>

<script setup>
import { ref } from 'vue'
import ImageCloud from './components/ImageCloud.vue'

// source is not resolved with the alias
const imageUrls = ref([
    'src/assets/css.png',
    'src/assets/git.png',
    'src/assets/html.png',
    'https://picsum.photos/id/1/200/300',
    'https://picsum.photos/id/12/200/300',
    "https://picsum.photos/id/42/200/300",
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/id/164/200/300",
    "https://picsum.photos/id/319/200/300",
    "https://picsum.photos/id/92/200/300",
    "https://picsum.photos/id/188/200/300",
    "https://picsum.photos/id/433/200/300",
    "https://picsum.photos/id/577/200/300",
    "https://picsum.photos/id/649/200/300",
    "https://picsum.photos/id/129/200/300"
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
