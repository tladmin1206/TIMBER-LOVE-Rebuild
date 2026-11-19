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
      className={`fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain backdrop-blur-sm animate-fadeIn sm:items-center sm:p-4 ${wide ? 'bg-ink p-0 sm:bg-ink/80' : 'bg-ink/80 p-4'}`}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* A wide dialog (the project questionnaire) is a full-screen sheet on a
          phone: no border, no inset, the form edge to edge, like an app screen.
          From sm up it is a centred panel. */}
      <div
        className={`relative w-full bg-ink sm:my-auto sm:border sm:border-border-subtle sm:p-9 ${
          wide ? 'min-h-full px-0 pb-6 pt-5 sm:min-h-0 sm:max-w-[680px]' : 'my-auto max-w-lg border border-border-subtle p-4'
        }`}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-2 top-2 grid h-11 w-11 place-items-center text-2xl leading-none text-cream/60 transition hover:text-cream"
        >
          ×
        </button>
        <div className={wide ? 'px-5 pr-14 sm:px-0' : ''}>
          <h2 className="h-card">{title}</h2>
          {subtitle && <p className="mt-2 text-sm text-body">{subtitle}</p>}
        </div>
        <div className={wide ? 'mt-3 sm:mt-6' : 'mt-6'}>{children}</div>
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
