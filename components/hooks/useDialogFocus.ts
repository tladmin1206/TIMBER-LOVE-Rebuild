"use client";
import { useEffect, type RefObject } from "react";

/** Keep keyboard navigation inside an open overlay and return focus on close. */
export function useDialogFocus(open: boolean, ref: RefObject<HTMLElement>) {
  useEffect(() => {
    if (!open || !ref.current) return;
    const previous = document.activeElement as HTMLElement | null;
    const root = ref.current;
    const background: { element: HTMLElement; inert: boolean }[] = [];
    let branch: HTMLElement | null = root;
    while (branch && branch !== document.body) {
      const parent: HTMLElement | null = branch.parentElement;
      if (!parent) break;
      Array.from(parent.children).forEach((sibling) => {
        if (
          sibling !== branch &&
          sibling instanceof HTMLElement &&
          !["SCRIPT", "STYLE", "LINK"].includes(sibling.tagName)
        ) {
          background.push({ element: sibling, inert: sibling.inert });
          sibling.inert = true;
        }
      });
      branch = parent;
    }
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () =>
      Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input,select,textarea,iframe,[tabindex="0"]',
        ),
      ).filter(
        (el) => el.getClientRects().length > 0 && !el.closest("[inert]"),
      );
    focusable()[0]?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const elements = focusable();
      const first = elements[0],
        last = elements[elements.length - 1];
      if (
        e.shiftKey &&
        (document.activeElement === first ||
          !root.contains(document.activeElement))
      ) {
        e.preventDefault();
        last?.focus();
      } else if (
        !e.shiftKey &&
        (document.activeElement === last ||
          !root.contains(document.activeElement))
      ) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      background.forEach(({ element, inert }) => {
        element.inert = inert;
      });
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", key);
      if (previous?.isConnected) previous.focus();
    };
  }, [open, ref]);
}
