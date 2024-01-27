import React, { useEffect, useState } from 'react';

const Game = () => {
  const [card, setCard] = useState(null);
  const [goldCardCount, setGoldCardCount] = useState(0);
  const [round, setRound] = useState(1);

  // ✅ Calculate what you can during rendering
  const isGameOver = round > 5;

  // 🔴 Avoid: Chains of Effects that adjust the state solely to trigger each other
  // useEffect(() => {
  //   if(card !== null && card.gold) {
  //     setGoldCardCount(c => c + 1);
  //   }
  // }, [card]);
  //
  // useEffect(() => {
  //   if(goldCardCount > 3) {
  //     setRound(r => r + 1);
  //     setGoldCardCount(0);
  //   }
  // }, [goldCardCount]);
  //
  //
  // useEffect(() => {
  //   if(round > 5) {
  //     setIsGameOver(true);
  //   }
  // }, [round]);
  //
  // useEffect(() => {
  //   alert('Good Game!');
  // }, [isGameOver]);

  const handlePlaceCard = nextCard => {
    if (isGameOver) {
      throw Error('Game already ended.');
    }

    // ✅ Calculate all the next state in the event handler
    setCard(nextCard);
    if (nextCard.gold)
      if (goldCardCount <= 3) {
        setGoldCardCount(goldCardCount);
      } else {
        setGoldCardCount(0);
        setRound(round + 1);
        if (round === 5) {
          alert('Good Game!');
        }
      }
  };

  return null;
};

export default Game;
