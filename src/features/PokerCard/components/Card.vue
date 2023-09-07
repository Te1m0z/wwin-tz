<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PokerCard',
  props: {
    id: Number,
    card_type: {
      type: String
    },
    card_number: {
      type: Number
    },
    isOpen: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    openedClass() {
      return this.isOpen ? 'opened' : ''
    }
  }
})
</script>

<template>
  <div :class="['card', 'poker-card', openedClass]" :data-card-id="id">
    <div class="front">
        front
    </div>
    <div class="back">
        back
    </div>
  </div>
</template>

<style lang="scss">
.poker-card {
  width: 185px;
  height: 277px;
  perspective: 500px;
  will-change: scroll-position;
  margin: 10px;
  z-index: 1;
  
  // @include lg {
  //   width: 100px;
  //   height: 100px;
  // }

  &.moving {
    z-index: 10;
  }

  &.opened {
    & .front {
      transform: rotateY(180deg);
    }
    & .back {
      transform: rotateY(360deg);
    }
  }

  & .front,
  & .back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 500ms ease;
    backface-visibility: hidden;
  }

  & .front {
    background: blue;
  }

  & .back {
    background: greenyellow;
    transform: rotateY(180deg);
  }
}
</style>
