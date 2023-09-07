<script lang="ts">
import { defineComponent, ref } from 'vue'
import { gsap } from 'gsap'
import { ActionButton, removeAllDataAttributes } from '@/shared'
import { PokerCard } from '@/features'
// заглушки на сервере
import { type TCard, type TClosedCard, getClosedCards, openCardOnServer } from '@/_mocks/cards'

const REF_PREFIX = 'card-' as const

export default defineComponent({
  name: 'HomePage',
  components: {
    ActionButton,
    PokerCard,
  },
  data() {
    // прабрасываем константы для использрвания в шаблоне
    return {
      REF_PREFIX,
      closedCards: <TClosedCard[]>[],
      openedCards: <TCard[]>[],
    }
  },
  created() {
    this.fetchClosedCards();
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
      //
      this.closedCards.splice(0, this.closedCards.length, ...cards)
    },
    async openCard() {
      //
      const response = await openCardOnServer()
      //
      if (!response) return window.alert('Some error on server');
      //
      const { selected_card } = response
      // ищем индекс для удаления среди закрытых
      const closedSelected = this.closedCards.find((card) => card.id === selected_card.id)
      //
      if (!closedSelected) return;
      //
      closedSelected.isOpen = true;
      //
      const nodeInClosed = document.querySelector(`[data-card-id="${closedSelected.id}"]`)
      //
      if (!nodeInClosed) return;
      //
      this.$nextTick(() => nodeInClosed.classList.add('moving'));
      // заглушка для позиции
      const openedSelected = nodeInClosed.cloneNode(true) as HTMLDivElement
      // модификации заглушки
      openedSelected.classList.add('hide')
      removeAllDataAttributes(openedSelected)
      //
      const openedCardsRow = this.$refs['openedCardsRow'] as HTMLDivElement;
      //
      if (!openedCardsRow) return;
      //
      openedCardsRow.append(openedSelected)
      //
      setTimeout(() => {
        const originalRect = nodeInClosed.getBoundingClientRect();
        const targetRect = openedSelected.getBoundingClientRect();
        //
        // Calculate the difference in positions
        const deltaX = targetRect.left - originalRect.left;
        const deltaY = targetRect.top - originalRect.top;

        gsap.to(nodeInClosed, {
          x: deltaX,
          y: deltaY,
          duration: 1,
          onComplete: () => {
            nodeInClosed.classList.remove('moving');
            //
            // const closedDeleteIndx = this.closedCards.findIndex((card) => card.id === selected_card.id)
            // //
            // if (closedDeleteIndx === -1) return;
            // // удаляем на фронтенде
            // this.closedCards.splice(closedDeleteIndx, 1);
          }
        });
      }, 1000);
      // // добавляем в выбранные на фронтенде
      // this.openedCards.push(selected_card)
      // //
      // const { id } = selected_card
      // // Перед стартом анимации - возьмем координаты на экране
      // const selectedCardNode = document.querySelector(`[data-card-id="${id}"]`)
      // //
      // if (!selectedCardNode) return
      // //
      // //const rect = selectedCardNode.getBoundingClientRect();
      // //
      // console.log(selectedCardNode)

      // DOM изменения закончены, можно начинать анимацию

      //
      // this.$nextTick(() => {
      //   console.log(document.querySelector(`[data-card-id="${selected_card.id}"]`))
      // })
    },
  }
})
// Заметки: пытался сделать анимацию с $ref но в v-for это массив + не гарантирует порядок
// и тп. решил использовать нативный css класс
</script>

<template>
  <div class="page home-page">
    <div class="cards cards--opened" ref="openedCardsRow">
      <PokerCard
        v-if="openedCards.length > 0"
        v-for="card in openedCards"
        :key="card.id"
        v-bind="card"
      />
    </div>
    <div v-if="closedCards.length > 0" class="cards cards--closed">
      <PokerCard
        v-for="card in closedCards"
        :key="card.id"
        v-bind="card"
      />
    </div>
    <ActionButton
        width="64px"
        height="64px"
        @click="openCard"
    >
      RAND
    </ActionButton>
  </div>
</template>

<style lang="scss">
.cards {
  display: flex;
  align-items: center;
  min-height: 297px;
  //margin: -10px;

  & .action-button {
    margin-left: 100px;
  }
}
</style>
