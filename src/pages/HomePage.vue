<script lang="ts">
import { defineComponent } from 'vue'
import { gsap } from 'gsap'
import { ActionButton, removeAllDataAttributes, recalculatePositions, debounce } from '@/shared'
import { PokerCard } from '@/features'
// заглушки на сервере
import { type TCard, getClosedCards, openCardOnServer } from '@/_mocks/cards'

export default defineComponent({
  name: 'HomePage',
  components: {
    ActionButton,
    PokerCard,
  },
  data() {
    return {
      isActionDisabled: false,
      cards: <TCard[]>[],
    }
  },
  created() {
    this.fetchClosedCards();
  },
  mounted() {
    window.addEventListener('resize', debounce(recalculatePositions, 500));
  },
  beforeUnmount() {
    window.removeEventListener('resize', recalculatePositions);
  },
  methods: {
    async fetchClosedCards() {
      // запрос на сервер за закрытыми карточками
      const cards = await getClosedCards()
        // подмешиваем isOpen
        .then((items) => {
          return items.map((i) => ({ ...i, isOpen: false }))
        })
      //
      this.cards.splice(0, this.cards.length, ...cards)
    },
    async openCard() {
      //
      this.isActionDisabled = true;
      //
      const response = await openCardOnServer()
      //
      if (!response) return window.alert('Some error on server');
      //
      const { id, card_number, card_type } = response
      // Ищем карточку среди своих на фронтенде в Vue
      const vueSelectedCard = this.cards.find((card) => card.id === id)
      //
      if (!vueSelectedCard) return;
      // делаем модификации
      vueSelectedCard.card_number = card_number
      vueSelectedCard.card_type = card_type
      vueSelectedCard.isOpen = true;
      // Ищем карточку в HTML дереве
      const htmlSelectedCard = document.querySelector(`[data-card-id="${id}"]`)
      //
      if (!htmlSelectedCard) return;
      //
      this.$nextTick(() => htmlSelectedCard.classList.add('moving'));
      // заглушка для позиции
      const htmlCloneSelectedCard = htmlSelectedCard.cloneNode(true) as HTMLDivElement
      // модификации заглушки
      htmlCloneSelectedCard.classList.add('hide')
      removeAllDataAttributes(htmlCloneSelectedCard)
      htmlCloneSelectedCard.setAttribute('data-card-was-id', String(id));
      //
      const openedCardsRow = this.$refs['openedCardsRow'] as HTMLDivElement;
      //
      if (!openedCardsRow) return;
      // Добавляем заглушку в DOM дерево
      openedCardsRow.append(htmlCloneSelectedCard)
      //
      setTimeout(() => {
        recalculatePositions()
        const originalRect = htmlSelectedCard.getBoundingClientRect();
        const targetRect = htmlCloneSelectedCard.getBoundingClientRect();
        //
        // Calculate the difference in positions
        const deltaX = targetRect.left - originalRect.left;
        const deltaY = targetRect.top - originalRect.top;

        gsap.to(htmlSelectedCard, {
          x: deltaX,
          y: deltaY,
          duration: 1,
          onStart: () => {
            //recalculatePositions()
          },
          onComplete: () => {
            htmlSelectedCard.classList.remove('moving');
            //
            this.isActionDisabled = false;
          }
        });
      }, 1000);
    },
  }
})
// Заметки: пытался сделать анимацию с $ref но в v-for это массив + не гарантирует порядок
// и тп. решил использовать нативный css класс
</script>

<template>
  <div class="page home-page">
    
    <div class="cards cards--opened" ref="openedCardsRow"></div>

    <div class="cards cards--closed">
      <PokerCard
        v-if="cards.length > 0"
        v-for="card in cards"
        :key="card.id"
        v-bind="card"
      />
    </div>

    <ActionButton
        width="64px"
        height="64px"
        :disabled="isActionDisabled"
        @click="openCard"
    >
      RAND
    </ActionButton>
  </div>
</template>

<style lang="scss">
.cards {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  min-height: 296px;
  justify-content: center;
  //margin: -10px;

  @include md {
    min-height: 200px;
  }

  & .action-button {
    margin-left: 100px;
  }
}
</style>
