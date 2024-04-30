<template>
  <div ref="imageCloud" id="image-cloud">
    <template v-for="(image, index) in imageEls" :key="index">
      <img :src="image.src" :class="image.classList.value" :style="image.style.cssText">
    </template>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import useImageCloud from '../composables/use-image-cloud'

export default {
  props: {
    imageUrls: Object,
    leftMultiplier: {
      type: Object,
      default: 80
    },
    topMultiplier: {
      type: Object,
      default: 80
    },
    // showName: Boolean,
  },
  setup (props, { emit }) {
    const imageCloud = ref(null);
    const imageEls = ref([])
    const existingPositions = ref([]);
    const { collisionCheck } = useImageCloud()

    onMounted(() => {
      imageEls.value = props.imageUrls.map((url, index) => {
        const leftVal = ref(null)
        const topVal = ref(null)
        leftVal.value = Math.random() * props.leftMultiplier; // Adjusted to account for image width
        topVal.value = Math.random() * props.topMultiplier; // Adjusted to account for image height
        // do {
        //   leftVal.value = Math.random() * props.leftMultiplier; // Adjusted to account for image width
        //   topVal.value = Math.random() * props.topMultiplier; // Adjusted to account for image height
        // } while (collisionCheck(leftVal.value, topVal.value, existingPositions.value));
        // existingPositions.value.push({ left: leftVal.value, top: topVal.value })
  
        const img = document.createElement('img');
        img.src = url;
        img.classList.add('image');
        img.style.left = `${leftVal.value}%`; // Random left position
        img.style.top = `${topVal.value}%`; // Random top position
        img.style.zIndex = index; // Adjust z-index for layering
        return img
      })
      // console.warn(imageEls.value)
    })

    
    return {
      imageCloud,
      imageEls
    }
  }
}
</script>

<style>
#image-cloud {
  position: relative;
  width: 100%;
  height: 25vh;
  border: 1px solid white;
}

.image {
  position: absolute;
  max-width: 100px;
  max-height: 100px;
  opacity: 0.7;
  transition: all 0.3s ease-in-out;
}

.image:hover {
  opacity: 1;
  transform: scale(1.2);
}
</style>