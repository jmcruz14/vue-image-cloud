<template>
  <div ref="imageCloud" id="image-cloud">
    <template v-for="(image, index) in imageEls" :key="index">
      <img 
        :src="image.src" 
        :class="image.classList.value" 
        :style="image.style.cssText"
      >
    </template>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import useImageCloud from '../composables/use-image-cloud.js'

export default {
  props: {
    imageUrls: {
      type: Array,
      default: () => []
    },
    leftMultiplier: {
      type: Number,
      default: 80
    },
    topMultiplier: {
      type: Number,
      default: 80
    },
    hitboxSize: {
      type: Number,
      default: 20  // Percentage-based hitbox size
    },
    maxAttempts: {
      type: Number,
      default: 50  // Maximum attempts to find a non-colliding position
    },
    // Scale factor for images
    minScale: {
      type: Number,
      default: 0.5  // Minimum scale factor for images
    },
    initialScale: {
      type: Number,
      default: 1.0  // Starting scale for images
    },
    scaleStep: {
      type: Number,
      default: 0.1  // How much to reduce scale on each attempt
    }
  },
  
  setup(props, { emit }) {
    const imageCloud = ref(null);
    const imageEls = ref([]);
    const existingPositions = ref([]);
    const { collisionCheck } = useImageCloud();
    
    const loadedImages = ref(new Set());
    const currentScale = ref(props.initialScale);

    const findValidImagePosition = (attempts = 0) => {
      if (attempts >= props.maxAttempts) {
        // Fallback position if we can't find a valid spot
        return {
          left: Math.random() * props.leftMultiplier,
          top: Math.random() * props.topMultiplier
        };
      }

      const left = Math.random() * props.leftMultiplier;
      const top = Math.random() * props.topMultiplier;

      // Check for collisions with existing positions
      if (!collisionCheck(left, top, existingPositions.value, props.hitboxSize)) {
        return { left, top };
      }

      // Recursively try to find a valid position
      return findValidImagePosition(attempts + 1);
    };

    const createImageElement = (url, index) => {
      const position = findValidImagePosition();
      
      // Store the position for future collision checks
      existingPositions.value.push({
        left: position.left,
        top: position.top
      });

      const img = document.createElement('img');
      img.src = url;
      img.classList.add('image');
      img.style.left = `${position.left}%`;
      img.style.top = `${position.top}%`;
      img.style.zIndex = index;
      img.style.position = 'absolute'; // Ensure absolute positioning
      
      // Optional: Add hover effect
      img.addEventListener('mouseover', () => {
        img.style.transform = 'scale(1.1)';
        img.style.zIndex = '999'; // Bring to front on hover
      });
      
      img.addEventListener('mouseout', () => {
        img.style.transform = 'scale(1)';
        img.style.zIndex = index.toString();
      });

      return img;
    };

    // Watch for changes in imageUrls
    watch(() => props.imageUrls, (newUrls) => {
      if (newUrls && newUrls.length > 0) {
        existingPositions.value = []; // Reset positions
        imageEls.value = newUrls.map((url, index) => createImageElement(url, index));
      }
    }, { immediate: true });

    onMounted(() => {
      if (props.imageUrls && props.imageUrls.length > 0) {
        existingPositions.value = []; // Reset positions
        imageEls.value = props.imageUrls.map((url, index) => createImageElement(url, index));
      }
    });

    // Optional: Cleanup function
    onUnmounted(() => {
      imageEls.value = [];
      existingPositions.value = [];
    });

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