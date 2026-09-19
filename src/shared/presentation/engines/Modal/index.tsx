import { useState } from "react";

import { createPortal } from "react-dom";

import { useIsomorphicEffect } from "@/shared/lib/react-hooks/use-isomorphic-effect";
import { cn } from "@/shared/lib/tailwind/cn";

import type { Props } from "./-types";

export default function ModalEngine(props: Props) {
  const {
    children,
    classNameBackdrop,
    classNameChildrenWrapper,
    animationDurationMs = 200,
    closeOnBackdropClick,
    isOpened,
    onClose,
  } = props;

  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  if (isOpened && !isMounted) {
    setIsMounted(true);
  }

  if (!isOpened && isVisible) {
    setIsVisible(false);
  }

  useIsomorphicEffect(() => {
    if (!isVisible) return;

    const prevOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isVisible]);

  useIsomorphicEffect(() => {
    if (!isOpened) return;

    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, [isOpened]);

  useIsomorphicEffect(() => {
    if (isOpened) return;

    const timeout = setTimeout(() => {
      setIsMounted(false);
    }, animationDurationMs);

    return () => clearTimeout(timeout);
  }, [isOpened, animationDurationMs]);

  const handleClickBackdrop = () => {
    if (!closeOnBackdropClick) return;
    onClose?.();
  };

  if (!isMounted) return null;

  const cnBackdrop = cn(
    "fixed inset-0",
    "bg-black/50",
    "transition-opacity ease-in-out",
    isVisible ? "opacity-100" : "opacity-0",
    classNameBackdrop,
  );

  const cnModalWrapper = cn(
    "fixed inset-0 z-100 size-full pointer-events-none *:pointer-events-auto",
    "flex items-center justify-center",
    "transition-opacity ease-in-out",
    isVisible ? "opacity-100" : "opacity-0 translate-y-2",
    classNameChildrenWrapper,
  );

  return (
    <>
      {createPortal(
        <div
          aria-hidden
          onClick={handleClickBackdrop}
          className={cnBackdrop}
          style={{
            transitionDuration: `${animationDurationMs}ms`,
          }}
        />,
        document.body,
      )}

      {createPortal(
        <div className={cnModalWrapper}>{children}</div>,
        document.body,
      )}
    </>
  );
}
