import React, { useState } from 'react';
import { Users, X, Plus } from 'lucide-react';
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
      <h2><Users size={24} style={{display:'inline', verticalAlign:'middle', marginRight:'8px'}}/> 학생 명단 관리</h2>
      <p style={{marginBottom: '1rem', color: '#666'}}>이름을 쉼표, 띄어쓰기 또는 줄바꿈으로 구분하여 여러 명을 한 번에 추가할 수 있습니다.</p>
      
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
          <Plus size={20} /> 추가
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
                <X size={16} />
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
