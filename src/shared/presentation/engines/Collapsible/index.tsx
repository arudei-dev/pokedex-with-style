import { useRef, useState } from 'react';

import { f } from '@/shared/lib/browser';
import { useIsomorphicEffect } from '@/shared/lib/react-hooks/use-isomorphic-effect';
import { cn } from '@/shared/lib/tailwind/cn';

import type { Props } from './-types';

export default function Collapsible(props: Props) {
  const {
    children,
    classNameChildrenWrapper,
    classNameWrapper,
    enableFirstAnimation,
    isOpened,
    animationDurationMs,
  } = props;

  const [allowAnimation, setAllowAnimation] = useState(false);
  const enableAnimation = enableFirstAnimation || allowAnimation;

  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState<boolean | undefined>();
  const [childrenHeight, setChildrenHeight] = useState<number | undefined>();

  const refChildrenWrapper = useRef<HTMLDivElement>(null);

  if (childrenHeight != null && !allowAnimation && isAnimating != null) {
    setAllowAnimation(true);
  }

  useIsomorphicEffect(() => {
    let idRAF: ReturnType<typeof requestAnimationFrame> | undefined;
    let idTimeout: ReturnType<typeof setTimeout> | undefined;

    if (isOpened) {
      idRAF = requestAnimationFrame(() => {
        setShouldRender(true);

        idRAF = requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      idRAF = requestAnimationFrame(() => {
        setIsAnimating(false);
      });

      idTimeout = setTimeout(() => {
        setShouldRender(false);
      }, animationDurationMs);
    }

    return () => {
      idRAF != null && cancelAnimationFrame(idRAF);
      idTimeout != null && clearTimeout(idTimeout);
    };
  }, [isOpened, animationDurationMs]);

  useIsomorphicEffect(() => {
    const element = refChildrenWrapper.current;
    if (!shouldRender || element == null) return;

    const updateHeight = () => {
      setChildrenHeight(element.scrollHeight);
    };

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  const cnWrapper = cn(
    'overflow-hidden',
    'transition-[height] ease-in-out',
    classNameWrapper,
  );

  const cnChildrenWrapper = cn(
    enableAnimation && [
      'transition-opacity ease-in-out',
      isAnimating ? 'opacity-100' : 'opacity-0',
    ],
    classNameChildrenWrapper,
  );

  const computedHeight = f(() => {
    if (!enableAnimation || childrenHeight == null) return undefined;

    if (!isAnimating) return '0px';

    return typeof childrenHeight === 'number'
      ? `${childrenHeight}px`
      : childrenHeight;
  });

  return (
    <div
      className={cnWrapper}
      style={{
        height: computedHeight,
        transitionDuration: `${animationDurationMs}ms`,
      }}
    >
      <div
        ref={refChildrenWrapper}
        className={cnChildrenWrapper}
        style={{
          transitionDuration: `${animationDurationMs}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
