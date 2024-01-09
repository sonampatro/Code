import React, { useState, useEffect } from 'react';
import './App.css';

interface Card {
  suit: string;
  value: string;
  image: string;
}

interface Deck {
  cards: Card[];
  drawnCards: Card[];
}
const SUITS = ['CLUBS', 'SPADES', 'HEARTS', 'DIAMONDS'];

const App: React.FC = () => {
  const [deck, setDeck] = useState<Deck>({
    cards: [],
    drawnCards: [],
  });

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        const deckData = await response.json();
        const deckId = deckData.deck_id;
        const cardsResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`);
        const cardsdeckData = await cardsResponse.json();
        setDeck({
          cards: cardsdeckData.cards,
          drawnCards: [],
        });
      } catch (error) {
        console.error('Error fetching deck:', error);
      }
    };

    fetchDeck();
  }, []);

  const shuffleDeck = () => {
    const shuffledDeck = [...deck.cards];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    setDeck({ ...deck, cards: shuffledDeck });
  };

  const drawCards = (numCards: number) => {
    const { cards, drawnCards } = deck;
    const newDrawnCards = cards.slice(0, numCards);
    setDeck({
      cards: cards.slice(numCards),
      drawnCards: [...drawnCards, ...newDrawnCards],
    });
  };
  
  const sortDrawnCards = () => {
    const { drawnCards } = deck;
    const sortedCards = drawnCards.sort((a, b) => {
      const suitComparison = SUITS.indexOf(a.suit) - SUITS.indexOf(b.suit);
  
      if (suitComparison !== 0) {
        return suitComparison;
      } else {
        const valuesOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE'];
        return valuesOrder.indexOf(b.value) - valuesOrder.indexOf(a.value);
      }
    });
    setDeck((prevDeck) => ({
      ...prevDeck,
      drawnCards: sortedCards,
    }));
  };
  

  return (
    <div className="container">
      <button className="button" onClick={shuffleDeck}>Shuffle Deck</button>
      <input className="input" type="number" min="1" max={deck.cards.length} placeholder='No. of Cards to be drawn' onChange={(event) => drawCards(Number(event.target.value))} />
      <button className="button" onClick={sortDrawnCards}>Sort Drawn Cards</button>
      <h2 className="title">Deck</h2>
      <ul className="deck">
        {deck.cards.map((card, index) => (
          <li key={index}>
            <img src={card.image} alt={`${card.value} of ${card.suit}`} />
          </li>
        ))}
      </ul>
      <h2 className="title">Drawn Cards</h2>
      <ul className="drawn-cards">
        {deck.drawnCards.map((card, index) => (
          <li key={index}>
            <img src={card.image} alt={`${card.value} of ${card.suit}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
