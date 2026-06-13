import React, { useState, useEffect, useRef } from 'react';
import { getStudents, getSecretOrder, saveSecretOrder } from './utils/localStorage';
import StudentManager from './components/StudentManager';
import SecretModal from './components/SecretModal';
import SlotMachine from './components/SlotMachine';

function App() {
  const [students, setStudents] = useState([]);
  const [secretOrder, setSecretOrder] = useState([]);
  const [pickCount, setPickCount] = useState(1);
  const [results, setResults] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);
  const [spinId, setSpinId] = useState(0);
  
  const clickCountRef = useRef(0);
  const clickTimeoutRef = useRef(null);

  useEffect(() => {
    setStudents(getStudents());
    setSecretOrder(getSecretOrder());
  }, []);

  const handleTitleClick = () => {
    clickCountRef.current += 1;
    
    if (clickCountRef.current >= 5) {
      setIsSecretModalOpen(true);
      clickCountRef.current = 0;
    }

    // Reset click count after 1 second of inactivity
    clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 1000);
  };

  const handlePick = () => {
    if (students.length === 0) {
      alert("학생 명단이 비어있습니다. 먼저 학생을 추가해주세요!");
      return;
    }

    if (pickCount < 1 || pickCount > students.length) {
      alert(`1명에서 ${students.length}명 사이로 선택해주세요.`);
      return;
    }

    setIsSpinning(true);
    setResults([]);

    // Determine results
    let newResults = [];
    let currentSecretOrder = [...secretOrder];
    
    // Create a pool of available students
    let availableStudents = [...students];

    for (let i = 0; i < pickCount; i++) {
      if (currentSecretOrder.length > 0) {
        // Pop from secret order
        const secretPick = currentSecretOrder.shift();
        newResults.push(secretPick);
        // Remove from available students so they aren't picked again
        availableStudents = availableStudents.filter(s => s !== secretPick);
      } else {
        // Random pick
        if (availableStudents.length === 0) {
            // Reset pool if somehow exhausted
            availableStudents = [...students].filter(s => !newResults.includes(s));
        }
        const randomIndex = Math.floor(Math.random() * availableStudents.length);
        const randomPick = availableStudents[randomIndex];
        newResults.push(randomPick);
        availableStudents.splice(randomIndex, 1);
      }
    }

    // Update secret order state and local storage if it was consumed
    if (currentSecretOrder.length !== secretOrder.length) {
      setSecretOrder(currentSecretOrder);
      saveSecretOrder(currentSecretOrder);
    }

    setSpinId(Date.now());
    setResults(newResults);
    setIsSpinning(true);

    // Calculate max duration based on pick count
    const maxDelay = (pickCount - 1) * 0.2;
    const totalDurationMs = (3 + maxDelay) * 1000;

    setTimeout(() => {
      setIsSpinning(false);
    }, totalDurationMs);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="title-container" onClick={handleTitleClick}>
          <h1 className="title">🎡 럭키 스피너 🎢</h1>
        </div>
        <p style={{marginTop: '1rem', color: 'var(--text)', fontSize: '1.2rem'}}>
          오늘은 누가 발표할까요? 두구두구~
        </p>
      </header>

      {/* Secret Modal */}
      <SecretModal 
        isOpen={isSecretModalOpen} 
        onClose={() => setIsSecretModalOpen(false)}
        secretOrder={secretOrder}
        setSecretOrder={setSecretOrder}
        students={students}
      />

      <main>
        {/* Controls */}
        <div className="card" style={{textAlign: 'center'}}>
          <div className="controls-section">
            <span style={{fontSize: '1.2rem'}}>뽑을 인원수:</span>
            <input 
              type="number" 
              min="1" 
              max={students.length || 1} 
              className="input count-input" 
              style={{marginBottom: 0}}
              value={pickCount}
              onChange={(e) => setPickCount(parseInt(e.target.value) || 1)}
            />
            <button 
              className="btn btn-accent" 
              onClick={handlePick}
              disabled={isSpinning || students.length === 0}
              style={{fontSize: '1.5rem', padding: '1rem 2rem'}}
            >
              <span className="material-symbols-outlined" style={{fontSize: '2rem'}}>play_arrow</span> 뽑기 시작!
            </button>
          </div>
        </div>

        {/* Slot Machine Display */}
        {(results.length > 0 || isSpinning) && (
          <div className="card">
            <SlotMachine results={results} isSpinning={isSpinning} spinId={spinId} />
          </div>
        )}

        {/* Student Manager */}
        <StudentManager students={students} setStudents={setStudents} />
      </main>
    </div>
  );
}

export default App;
