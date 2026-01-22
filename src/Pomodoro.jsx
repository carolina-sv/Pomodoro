import React, { useState, useEffect } from 'react';
import './Pomodoro.css'; // O IMPORT TEM QUE ESTAR AQUI

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

    } else if (timeLeft === 0) {
      setIsActive(false);
      const audio = new Audio('/alarm.mp3'); 
      audio.play(); 
      alert("Tempo esgotado!");
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isFocusMode ? 1500 : 300);
  };

  const handleModeChange = () => {
      const newMode = !isFocusMode;
      setIsFocusMode(newMode);
      setIsActive(false);
      setTimeLeft(newMode ? 1500 : 300);
  }
   useEffect(() => {
     document.title = `${formatTime(timeLeft)} - Pomodoro`;
    }, [timeLeft]); 

  return (
    <div className="pomodoro-card">
      
      <h1>{isFocusMode ? 'Modo Foco' : 'Hora da Pausa'}</h1>
      
      <div className="timer-display">
        {formatTime(timeLeft)}
      </div>

      <div className="controls">
        {/* Note as classes: btn e btn-primary */}
        <button className="btn btn-primary" onClick={toggleTimer}>
          {isActive ? 'Pausar' : 'Iniciar'}
        </button>
        
        {/* Note as classes: btn e btn-secondary */}
        <button className="btn btn-secondary" onClick={resetTimer}>
          Reiniciar
        </button>
      </div>

      <button className="btn-mode" onClick={handleModeChange}>
        Mudar para {isFocusMode ? 'Intervalo (5 min)' : 'Foco (25 min)'}
      </button>
    </div>
  );
};

export default Pomodoro;