// Имитация сервера
// данные предоставляются на фронтенд в закрытом виде (только id и тп..)

enum CARD_TYPES {
    CHERVI = 'chervi',
    PICKI = 'picki',
    BUBNI = 'bubni',
    KRESTI = 'kresti',
}

type TCard = {
    id: number
    // возможно здесь подошли бы бит. маски
    card_type?: Lowercase<keyof typeof CARD_TYPES>
    card_number?: number
    // frontend
    isOpen?: boolean
}

type TClosedCard = Pick<TCard, 'id'> & { isOpen?: boolean }

// Карточки которые выдались - храню в оперативной памяти
const closed_cards: TCard[] = [
    {
        id: 1,
        card_type: CARD_TYPES.KRESTI,
        card_number: 6
    },
    {
        id: 2,
        card_type: CARD_TYPES.BUBNI,
        card_number: 20
    },
    {
        id: 3,
        card_type: CARD_TYPES.CHERVI,
        card_number: 11
    }
]

const opened_cards: TCard[] = []


async function openCardOnServer(): Promise<TCard | null> {
    //
    if (!closed_cards.length) return null;
    //
    const randomIndex = Math.floor(Math.random() * closed_cards.length);
    //
    const randomCard = closed_cards[randomIndex];
    // ищем индекс для удаления
    const indexInClosed = closed_cards.findIndex((card) => card.id === randomCard.id);
    //
    if (indexInClosed === -1) return null;
    // удаляем из закрытых
    closed_cards.splice(indexInClosed, 1);
    // добавляем в массив открытых
    opened_cards.push(randomCard);
    //
    return randomCard;
}

async function getClosedCards(): Promise<TClosedCard[]> {
    return closed_cards.map(({ id }) => ({ id }))
}

export {
    CARD_TYPES,
    type TCard,
    type TClosedCard,
    closed_cards,
    opened_cards,
    openCardOnServer,
    getClosedCards
}