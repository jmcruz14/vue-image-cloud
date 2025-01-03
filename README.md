# Vue Image Cloud

A Vue component for creating an image cloud for your Vue app.

> [!NOTE] 
> This package is currently undergoing additional testing, but the algorithm in place is currently effective for its main feature: distributing images within a bounded box.

## Installation

### npm
```Shell
npm install vue-image-cloud
```

### yarn 
```Shell
yarn add vue-image-cloud
```

## Instructions

In any Vue file, use the following syntax

```JS
<script>
import { ImageCloud } from 'vue-image-cloud'

export default {
  ...,
  components: {
    ImageCloud
  },
  ...
}
</script>

<template>
  <ImageCloud />
</template>
```

<hr>

# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously Volar) and disable Vetur
