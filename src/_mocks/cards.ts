// Имитация сервера
// данные предоставляются на фронтенд в закрытом виде (только id и тп..)

type TCard = {
    id: number,
    // возможно здесь подошли бы бит. маски
    card_type: 'chervi' | 'picki' | 'bubni' | 'kresti',
    card_number: number;
}

type TClosedCard = Pick<TCard, 'id'> & { isOpen?: boolean }

type TOpenedResponse = {
    selected_card: TCard,
    closed_cards: TClosedCard[],
    opened_cards: TCard[],
}

// Карточки которые выдались - храню в оперативной памяти
const closed_cards: TCard[] = [
    {
        id: 1,
        card_type: 'chervi',
        card_number: 6
    },
    {
        id: 2,
        card_type: 'picki',
        card_number: 20
    },
    {
        id: 3,
        card_type: 'bubni',
        card_number: 11
    }
]

const opened_cards: TCard[] = []


async function openCardOnServer(): Promise<TOpenedResponse | null> {
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
    return {
        selected_card: randomCard,
        closed_cards,
        opened_cards,
    };
}

async function getClosedCards(): Promise<TClosedCard[]> {
    return closed_cards.map(({ id }) => ({ id }))
}

export {
    type TCard,
    type TClosedCard,
    closed_cards,
    opened_cards,
    openCardOnServer,
    getClosedCards
}