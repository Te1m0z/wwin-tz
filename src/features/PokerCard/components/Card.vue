<script lang="ts">
import { defineComponent } from 'vue'
import { CARD_TYPES } from '@/_mocks/cards'

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
  data() {
    return {
      CARD_TYPES
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
    
    <div class="front"></div>
    
    <div class="back">
        <div v-if="Number.isInteger(card_number)" class="poker-card-number">
          {{ card_number }}
        </div>
        <div v-if="card_type" class="poker-card-type">
          <svg v-if="card_type === CARD_TYPES.KRESTI" xmlns="http://www.w3.org/2000/svg" width="47" height="50" viewBox="0 0 47 50" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M43.6672 19.8532C43.6672 19.8532 38.6132 14.8227 32.6802 18.1967C33.9714 17.0478 34.9522 15.5933 35.5325 13.9672C36.1127 12.341 36.2737 10.5953 36.0007 8.89077C34.7067 -0.366421 23.4512 0.0111643 23.4512 0.0111643C23.4512 0.0111643 12.5497 -0.683126 10.9016 8.87858C10.7583 10.6049 11.0004 12.3415 11.6105 13.9633C12.2205 15.585 13.1834 17.0517 14.4297 18.2576C8.47229 14.7496 3.35725 19.8532 3.35725 19.8532C1.18739 22.1629 -0.0138745 25.2139 0.000120931 28.3796C0.000120931 35.1763 4.35828 40.4748 12.0736 40.4748C13.6633 40.4494 15.228 40.075 16.6563 39.3782C18.0847 38.6814 19.3418 37.6793 20.3382 36.4431C20.3382 36.4431 21.8398 39.6709 19.3128 44.738C18.4224 46.6013 16.9126 48.0992 15.0401 48.9768L16.0777 50C18.4191 48.9378 20.9336 48.3065 23.5 48.1364C26.0649 48.2988 28.5793 48.9219 30.9223 49.9757L31.9599 48.9525C30.0375 48.045 28.4952 46.4932 27.6018 44.5675C25.1602 39.5857 26.6618 36.4187 26.6618 36.4187C27.6582 37.655 28.9153 38.6571 30.3437 39.3539C31.772 40.0507 33.3367 40.4251 34.9264 40.4505C42.6295 40.4505 46.9999 35.152 46.9999 28.3552C47.0142 25.2013 45.8223 22.1606 43.6672 19.8532Z" fill="black"/>
          </svg>
          <div v-if="card_type === CARD_TYPES.BUBNI">
            BUBNI svg must be here
          </div>
          <div v-if="card_type === CARD_TYPES.CHERVI">
            CHERVI svg must be here
          </div>
          <div v-if="card_type === CARD_TYPES.PICKI">
            PICKI svg must be here
          </div>
        </div>
    </div>
  </div>
</template>

<style lang="scss">
.poker-card {
  display: flex;
  flex-flow: column nowrap;
  width: 185px;
  height: 276px;
  perspective: 500px;
  will-change: scroll-position;
  margin: 10px;
  z-index: 1;
  
  @include md {
    position: absolute;
    width: 100px;
    height: 180px;
  }

  &.hide {
    position: relative;
  }

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

  &-number {
    color: #000;
    font-size: 48px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    @include md {
      font-size: 30px;
    }
  }

  &-type {
    margin-top: 8px;
  }

  & .front,
  & .back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 500ms ease;
    border-radius: 20px;
    backface-visibility: hidden;

    @include md {
      border-radius: 15px;
    }
  }

  & .front {
    border: 9px solid #555660;
    background-image: url('@/assets/textures/card_crosses.png');
    background-position: -9px;
    @include md {
      border-width: 4px;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(to bottom, #3085E8, #1660B6);
      opacity: 0.2;
      border-radius: 10px;

      @include md {
        border-radius: 10px;
      }
    }
  }

  & .back {
    padding: 10px 20px;
    transform: rotateY(180deg);
    background: #FFF;

    @include md {
      padding: 5px 8px;
    }
  }
}
</style>
