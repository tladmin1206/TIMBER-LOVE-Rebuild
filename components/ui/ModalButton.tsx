'use client';

import { useModal } from './ModalProvider';

/** A button that opens one of the global lead-capture modals. */
export default function ModalButton({
  modal,
  className = 'btn-solid',
  children,
}: {
  modal: 'connect' | 'work-with-us';
  className?: string;
  children: React.ReactNode;
}) {
  const { openModal } = useModal();
  return (
    <button type="button" onClick={() => openModal(modal)} className={className}>
      {children}
    </button>
  );
}
