'use client';

import { useState } from 'react';
/** 確認用のモーダル */
import Modal from 'react-modal';

export default function CustomConfirm() {
  console.log('モーダル');
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const closeModal = () => setIsOpen(false);
  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <h1>サインアウトしますがよろしいですか？</h1>
        <button>キャンセル</button>
        <button>サインアウト</button>
      </Modal>
    </div>
  );
}
