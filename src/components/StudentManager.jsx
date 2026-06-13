import React, { useState } from 'react';
import { saveStudents } from '../utils/localStorage';

const StudentManager = ({ students, setStudents }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    
    // Split by comma, space, or newline for bulk add
    const newNames = inputValue
      .split(/[, \n]+/)
      .map(name => name.trim())
      .filter(name => name.length > 0 && !students.includes(name));

    if (newNames.length > 0) {
      const updatedStudents = [...students, ...newNames];
      setStudents(updatedStudents);
      saveStudents(updatedStudents);
    }
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const handleDelete = (nameToRemove) => {
    const updatedStudents = students.filter(name => name !== nameToRemove);
    setStudents(updatedStudents);
    saveStudents(updatedStudents);
  };

  return (
    <div className="card">
      <h2 style={{color: '#F3F4F6'}}><span className="material-symbols-outlined" style={{display:'inline', verticalAlign:'middle', marginRight:'8px', fontSize: '28px'}}>group</span> 학생 명단 관리</h2>
      <p style={{marginBottom: '1rem', color: '#9CA3AF'}}>이름을 쉼표, 띄어쓰기 또는 줄바꿈으로 구분하여 여러 명을 한 번에 추가할 수 있습니다.</p>
      
      <div style={{display: 'flex', gap: '0.5rem'}}>
        <input
          type="text"
          className="input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="예: 홍길동, 김철수, 이영희"
        />
        <button className="btn btn-secondary" onClick={handleAdd} style={{height: 'fit-content'}}>
          <span className="material-symbols-outlined" style={{fontSize: '20px'}}>add</span> 추가
        </button>
      </div>

      <div className="student-list-container">
        {students.length === 0 ? (
          <p style={{color: '#999', fontStyle: 'italic'}}>등록된 학생이 없습니다.</p>
        ) : (
          students.map(student => (
            <div key={student} className="student-tag">
              {student}
              <button className="delete-btn" onClick={() => handleDelete(student)}>
                <span className="material-symbols-outlined" style={{fontSize: '16px'}}>close</span>
              </button>
            </div>
          ))
        )}
      </div>
      <div style={{marginTop: '1rem', fontWeight: 'bold'}}>
        총 {students.length}명
      </div>
    </div>
  );
};

export default StudentManager;
