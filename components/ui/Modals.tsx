'use client';

import { useModal } from './ModalProvider';
import ContactForm from '@/components/forms/ContactForm';
import { site } from '@/lib/site';

function Shell({
  title,
  subtitle,
  children,
  onClose,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink/80 p-4 backdrop-blur-sm animate-fadeIn sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative my-8 w-full max-w-lg border border-border-subtle bg-surface p-7 sm:p-9">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-2xl leading-none text-cream/60 transition hover:text-cream"
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
        subtitle="Let's build something together. Share a few details and our team will be in touch."
        onClose={closeModal}
      >
        <ContactForm source="work-with-us-popup" compact />
      </Shell>
    );
  }

  return null;
}
