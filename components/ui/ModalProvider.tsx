'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type ModalId = 'connect' | 'work-with-us' | null;

type Ctx = {
  open: ModalId;
  openModal: (id: Exclude<ModalId, null>) => void;
  closeModal: () => void;
};

const ModalContext = createContext<Ctx | null>(null);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}

export default function ModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<ModalId>(null);

  const openModal = useCallback((id: Exclude<ModalId, null>) => setOpen(id), []);
  const closeModal = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, closeModal]);

  return (
    <ModalContext.Provider value={{ open, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}
