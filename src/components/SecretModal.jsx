import React, { useState } from 'react';
import { saveSecretOrder } from '../utils/localStorage';

const SecretModal = ({ isOpen, onClose, secretOrder, setSecretOrder, students }) => {
  const [inputValue, setInputValue] = useState(secretOrder.join(', '));

  if (!isOpen) return null;

  const handleSave = () => {
    const newOrder = inputValue
      .split(/[, \n]+/)
      .map(name => name.trim())
      .filter(name => name.length > 0);
    
    setSecretOrder(newOrder);
    saveSecretOrder(newOrder);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 style={{display:'flex', alignItems:'center', gap:'8px', color: '#F3F4F6'}}>
            <span className="material-symbols-outlined">settings</span> 선생님 전용 설정 (비밀)
          </h2>
          <button className="delete-btn" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div style={{marginBottom: '1rem'}}>
          <p style={{marginBottom: '0.5rem', color: '#666'}}>
            미리 나올 발표자 순서를 입력하세요. (쉼표, 띄어쓰기로 구분)
          </p>
          <p style={{marginBottom: '1rem', color: '#D1D5DB', fontSize: '0.9rem'}}>
            주의: 입력한 학생이 학생 명단에 없으면 오류가 날 수 있습니다. 학생 명단에 있는 이름과 동일하게 입력하세요.
          </p>
          <textarea
            className="input"
            style={{height: '100px', resize: 'vertical'}}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="예: 김철수, 이영희, 박지민"
          />
        </div>

        <div style={{display: 'flex', justifyContent: 'flex-end', gap: '1rem'}}>
          <button className="btn" onClick={handleSave}>
            <span className="material-symbols-outlined" style={{fontSize: '20px'}}>save</span> 저장 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecretModal;
