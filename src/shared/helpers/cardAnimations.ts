import { gsap } from 'gsap'

export function recalculatePositions() {
  console.log('recalculatePositions')
    // заглушки
    const hideCards = document.querySelectorAll('.poker-card.hide');
    //
    for (const hideCard of Array.from(hideCards)) {
        //console.log(hideCard)
        //
        const htmlId = hideCard.getAttribute('data-card-was-id')
        //
        if (!htmlId || !htmlId.length) return
        //
        const id: number = parseInt(htmlId)
        //
        const originalCard = document.querySelector(`[data-card-id="${id}"]`)
        //
        if (!originalCard) return
        //
        const originalRect = originalCard.getBoundingClientRect();
        const targetRect = hideCard.getBoundingClientRect();
        //
        // Calculate the difference in positions
        const deltaX = targetRect.left - originalRect.left;
        const deltaY = targetRect.top - originalRect.top;

        gsap.to(originalCard, {
          x: `+=${deltaX}`,
          y: `+=${deltaY}`,
          duration: 1,
        });
    }
}