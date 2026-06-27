import React from 'react';
import './PolicyModal.css';

const PolicyModal = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="policy-modal-overlay" onClick={onClose}>
      <div className="policy-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="policy-modal-header">
          <h2>{type === 'terms' ? '이용약관' : '개인정보처리방침'}</h2>
          <button className="policy-close-btn" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="policy-modal-body">
          {type === 'terms' ? (
            <div className="policy-text">
              <p><strong>제1조 (목적)</strong><br/>
              이 약관은 '럭키 스피너'(이하 '본 서비스')가 제공하는 무료 교육용 웹 애플리케이션 서비스(이하 '서비스')를 이용함에 있어 서비스 제공자와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.</p>
              
              <p><strong>제2조 (정의)</strong><br/>
              1. '서비스'란 본 플랫폼에서 제공하는 랜덤 발표자 추출 등 교육용 웹 애플리케이션을 말합니다.<br/>
              2. '이용자'란 본 서비스에 접속하여 이 약관에 따라 서비스를 이용하는 모든 사용자를 말합니다.</p>

              <p><strong>제3조 (약관의 명시와 개정)</strong><br/>
              1. 본 서비스는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 내에 게시합니다.<br/>
              2. 본 서비스는 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.<br/>
              3. 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 공지합니다.</p>

              <p><strong>제4조 (서비스의 제공)</strong><br/>
              1. 본 서비스는 교육 및 활동 지원 목적의 무료 웹 애플리케이션을 제공합니다.<br/>
              2. 서비스의 이용은 무료이며, 별도의 유료 결제가 필요하지 않습니다.</p>

              <p><strong>제5조 (서비스의 중단)</strong><br/>
              본 서비스는 시스템 점검, 고장 등의 사유가 발생한 경우 서비스 제공을 일시 중단할 수 있으며, 무료 서비스이므로 별도의 보상은 제공되지 않습니다.</p>

              <p><strong>제6조 (이용자의 의무)</strong><br/>
              이용자는 타인의 정보 도용, 운영 방해, 타인의 명예 손상 및 공서양속에 반하는 행위를 하여서는 안 됩니다.</p>

              <p><strong>제7조 (저작권)</strong><br/>
              본 서비스가 작성한 저작물에 대한 저작권은 서비스 제공자에게 귀속되며, 이용자는 무단 복제 및 배포를 할 수 없습니다.</p>

              <p><strong>제8조 (면책조항)</strong><br/>
              본 서비스는 무료로 제공되는 교육용 서비스로서, 서비스 이용 중 발생하는 문제에 대해 제한적 책임을 집니다.</p>

              <p><strong>제9조 (분쟁해결)</strong><br/>
              서비스와 이용자 간 분쟁은 대한민국 법을 적용하며, 관할법원으로 합니다.</p>

              <p><strong>부칙</strong><br/>
              이 약관은 2026년 1월 28일부터 시행됩니다.</p>
            </div>
          ) : (
            <div className="policy-text">
              <p><strong>제1조 (수집하는 개인정보 항목 및 방법)</strong><br/>
              1. 본 서비스는 회원가입 절차가 없으며, 이름, 전화번호, 이메일 등 개인을 식별할 수 있는 어떠한 개인정보도 별도로 수집하거나 서버로 전송하지 않습니다.<br/>
              2. 이용자가 서비스 내에 입력하는 데이터(예: 학생 이름, 명단 등)는 이용자가 사용하는 브라우저의 로컬 스토리지(Local Storage)에만 임시로 저장됩니다.</p>

              <p><strong>제2조 (개인정보의 처리 목적)</strong><br/>
              저장된 데이터는 오직 랜덤 발표자 추출 기능의 정상 동작과 페이지 새로고침 시 데이터 유지를 위해서만 사용됩니다.</p>

              <p><strong>제3조 (개인정보의 제3자 제공)</strong><br/>
              본 서비스는 외부 서버로 데이터를 전송하지 않으므로, 제3자에게 개인정보를 제공하거나 공유하는 일이 원천적으로 불가능합니다.</p>

              <p><strong>제4조 (개인정보의 파기절차 및 방법)</strong><br/>
              이용자가 브라우저 캐시 및 인터넷 사용 기록을 삭제하거나 시크릿 모드를 닫을 경우 데이터는 즉시 파기됩니다.</p>

              <p><strong>제5조 (이용자의 권리와 그 행사 방법)</strong><br/>
              이용자는 언제든지 자신의 브라우저 설정을 통해 본 서비스가 브라우저에 저장한 데이터를 직접 삭제하고 권리를 행사할 수 있습니다.</p>

              <p><strong>제6조 (개인정보보호 책임자)</strong><br/>
              본 서비스는 별도의 서버를 운영하거나 데이터를 수집하지 않으므로, 데이터 관리에 대한 통제권과 책임은 해당 기기를 사용하는 이용자 본인에게 있습니다.</p>
              
              <p><strong>부칙</strong><br/>
              이 방침은 2026년 1월 28일부터 시행됩니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
