import { useEffect } from 'react';

// Whether the menu was last opened by touch/mouse or by keyboard
let lastInput = 'keyboard';
if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointerdown',
    () => {
      lastInput = 'pointer';
    },
    true
  );
  window.addEventListener(
    'keydown',
    () => {
      lastInput = 'keyboard';
    },
    true
  );
}

/*
 * While the site menu is open, the rest of the page is off limits:
 *
 * - Everything outside the menu, its button, the Animate toggle, and the
 *   overlay is made `inert`, so it can't be clicked, focused, or read by
 *   screen readers.
 * - Scrolling the page closes the menu.
 * - Tab only moves between the Animate toggle, the menu links, and the
 *   close button. (On mobile the Animate toggle is inside the menu, so
 *   no toggleRef is passed.)
 * - Escape closes the menu.
 * - If resizing hides this header (the site swaps between its desktop and
 *   mobile headers), the menu closes, so the other header isn't left locked.
 *
 * Opening with the keyboard moves focus to the first link (a tap or click
 * leaves it on the menu button); closing with Escape puts focus back on
 * the menu button.
 */
export function useNavModal({
  open,
  setOpen,
  navRef,
  buttonRef,
  overlayRef,
  toggleRef,
}) {
  useEffect(() => {
    const nav = navRef.current;
    const buttonWrap = buttonRef.current;
    if (!open || !nav || !buttonWrap) return undefined;
    const button = buttonWrap.querySelector('button');

    // 1. Make everything else inert. Walk up from the menu to <body>; at
    //    each level, every sibling that doesn't hold the menu, its button,
    //    the Animate toggle, or the overlay gets `inert`.
    const toggleWrap = toggleRef?.current;
    const keep = [nav, buttonWrap, toggleWrap, overlayRef.current].filter(
      Boolean
    );
    const madeInert = [];
    for (
      let parent = nav.parentElement;
      parent && parent !== document.documentElement;
      parent = parent.parentElement
    ) {
      Array.from(parent.children).forEach((child) => {
        const holdsKept = keep.some((el) => child === el || child.contains(el));
        if (!holdsKept && !child.inert) {
          child.inert = true;
          madeInert.push(child);
        }
      });
    }

    // 2. Scrolling the page closes the menu
    const onScroll = () => setOpen(false);
    window.addEventListener('scroll', onScroll, { passive: true });

    // 3. Resizing to the other header's size closes this one
    const onResize = () => {
      if (!buttonWrap.getClientRects().length) setOpen(false);
    };
    window.addEventListener('resize', onResize);

    // 4. Keyboard: Escape closes, Tab loops inside the menu
    const toggleButton = toggleWrap?.querySelector('button');
    // Only what's actually showing (the mobile menu hides its Animate
    // button on touch screens)
    const focusables = () =>
      [toggleButton, ...nav.querySelectorAll('a[href], button'), button].filter(
        (el) => el && el.getClientRects().length > 0
      );
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        button?.focus();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (!items.includes(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    // Start keyboard users on the first link. A tap or click leaves focus on
    // the menu button instead, so phones don't show a focus ring on the
    // first link (Tab still goes straight into the menu from there).
    if (lastInput !== 'pointer') {
      nav.querySelector('a[href]')?.focus({ preventScroll: true });
    }

    return () => {
      madeInert.forEach((el) => {
        el.inert = false;
      });
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, setOpen, navRef, buttonRef, overlayRef, toggleRef]);
}
