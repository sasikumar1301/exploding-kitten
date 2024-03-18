import React, { useState, useEffect } from 'react';
import './App.css';

const cards = ['Cat', 'Diffuse', 'Shuffle', 'Exploding Kitten'];

function App() {
  const [deck, setDeck] = useState([]);
  const [gameOver, setGameOver] = useState(true); // Initially, the game is over
  const [message, setMessage] = useState('');
  const [currentCardIndex, setCurrentCardIndex] = useState(-1);
  const [diffuseUsed, setDiffuseUsed] = useState(false);
   // Track if the card is flipped
  const [winCount, setWinCount] = useState(() => {
    const storedWinCount = localStorage.getItem('winCount');
    return storedWinCount ? parseInt(storedWinCount) : 0; // Retrieve win count from local storage
  }); 

  useEffect(() => {
    localStorage.setItem('winCount', winCount); // Store win count in local storage
  }, [winCount]);

  const startGame = () => {
    const initialDeck = Array.from({ length: 5 }, () => cards[Math.floor(Math.random() * cards.length)]);
    setDeck(initialDeck);
    setGameOver(false);
    setMessage('');
    setCurrentCardIndex(0);
    setDiffuseUsed(false);
    
  };

  const handleCardClick = () => {
    
     
    if (!gameOver) {
      if (currentCardIndex === deck.length - 1) {
        alert('Victory. For new game click start button')
        setMessage('You win!');
        setWinCount(prevCount => prevCount + 1); // Increment win count
        setGameOver(true);
        
      } else {
        const card = deck[currentCardIndex];
        let updatedIndex = currentCardIndex + 1;
        

        if (card === 'Diffuse') {
          setMessage('Diffuse card removed from the deck.');
          setDiffuseUsed(true);
          
        } else if (diffuseUsed && card === 'Exploding Kitten') {
          setMessage('Explosion avoided due to diffuse card!');
          
          
          setDiffuseUsed(false);
        } else {
          switch (card) {
            case 'Cat':
              setMessage('Cat card removed from the deck.');
              setDiffuseUsed(false);
              
              break;
            case 'Shuffle':
              startGame();
              setMessage('Deck shuffled.Due to you picked a shuffle card.');
              
              return;
            case 'Exploding Kitten':
              setMessage('Game Over. You picked an Exploding Kitten! For new game click start button');
              alert('Game Over. You picked an Exploding Kitten! For new game click start button')
              setGameOver(true);
              setDiffuseUsed(false);
              
              break;
            default:
              setMessage('Unknown card.');
              setDiffuseUsed(false);
              
          }
        }
        setCurrentCardIndex(updatedIndex);
      }
    }
  };

  return (
    <div className="App">
      <h1>Exploding Kittens</h1>
      <button onClick={startGame} disabled={!gameOver} className='button'>
        Start Game
      </button>
      <p>Win Count: {winCount}</p> 
      <button className="cd" onClick={handleCardClick} disabled={gameOver}>
        {gameOver ? 'X' : "?"} 
      </button>
      {/* (currentCardIndex !== -1 && deck[currentCardIndex]) */}
      {message && <p className='sentence'>{message}</p>}
    </div>
  );
}
export default App;








