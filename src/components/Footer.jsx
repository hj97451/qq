import React, { useState } from 'react';
import './Footer.css';
import PolicyModal from './PolicyModal';

const Footer = () => {
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <>
      <footer className="app-footer">
        <div className="footer-links">
          <button className="footer-link" onClick={() => openModal('terms')}>이용약관</button>
          <span className="footer-divider">|</span>
          <button className="footer-link" onClick={() => openModal('privacy')}>개인정보처리방침</button>
        </div>
        <div className="footer-info">
          <p>정보관리책임자: 박주옥</p>
          <p className="copyright">&copy; 2026 럭키 스피너. All rights reserved.</p>
        </div>
      </footer>
      <PolicyModal type={modalType} onClose={closeModal} />
    </>
  );
};

export default Footer;
