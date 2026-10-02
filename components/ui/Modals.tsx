'use client';

import { useModal } from './ModalProvider';
import ContactForm from '@/components/forms/ContactForm';
import DesignBuildQuestionnaire from '@/components/forms/DesignBuildQuestionnaire';
import { site } from '@/lib/site';
import { useRef } from 'react';
import { useDialogFocus } from '@/components/hooks/useDialogFocus';

function Shell({
  title,
  subtitle,
  children,
  onClose,
  wide = false,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  const dialog = useRef<HTMLDivElement>(null);
  useDialogFocus(true, dialog);
  return (
    <div
      ref={dialog}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink/80 p-4 backdrop-blur-sm animate-fadeIn sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`relative my-auto w-full border border-border-subtle bg-ink p-4 sm:p-9 ${wide ? 'max-w-3xl' : 'max-w-lg'}`}>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-2 top-2 grid h-11 w-11 place-items-center text-2xl leading-none text-cream/60 transition hover:text-cream"
        >
          ×
        </button>
        <h2 className="h-card">{title}</h2>
        {subtitle && <p className="mt-2 text-sm text-body">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

export default function Modals() {
  const { open, closeModal } = useModal();

  if (open === 'connect') {
    return (
      <Shell
        title="Connect With Us"
        subtitle={`Tell us about your project. Prefer to talk? Call ${site.phone}.`}
        onClose={closeModal}
      >
        <ContactForm source="connect-popup" compact />
      </Shell>
    );
  }

  if (open === 'work-with-us') {
    return (
      <Shell
        title="Work With Us"
        subtitle="Tell us about your home and what you have in mind."
        onClose={closeModal}
        wide
      >
        <DesignBuildQuestionnaire />
      </Shell>
    );
  }

  return null;
}
