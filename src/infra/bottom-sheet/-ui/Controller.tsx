import { useEffect, useRef, useState } from "react";

import useHandler from "@/shared/lib/react-hooks/use-handler";
import ModalEngine from "@/shared/presentation/engines/Modal";

import { BottomSheetModel } from "../-model";
import type { OpenPayload } from "../-rules";
import Container from "./-presentation/Container";

const DURATION_MS = 200;

export default function BottomSheetController() {
  const [isOpen, setIsOpen] = useState(false);

  const [prevInstance, setPrevInstance] = useState<OpenPayload>();
  const [currInstance, setCurrInstance] = useState<OpenPayload>();

  const emit = BottomSheetModel.useEmit();

  const refTimeoutCleanupPrev = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    if (isOpen) return;

    refTimeoutCleanupPrev.current = setTimeout(() => {
      setPrevInstance(undefined);
    }, DURATION_MS);

    return () => {
      if (!refTimeoutCleanupPrev.current) return;
      clearTimeout(refTimeoutCleanupPrev.current);
    };
  }, [isOpen]);

  BottomSheetModel.useSubscribe("infra/bottom-sheet/open", (payload) => {
    setIsOpen(true);
    setPrevInstance(payload);
    setCurrInstance(payload);
  });

  BottomSheetModel.useSubscribe("infra/bottom-sheet/close", () => {
    setIsOpen(false);
    setCurrInstance(undefined);
  });

  const handleBottomSheetClose = useHandler(() => {
    emit("infra/bottom-sheet/close");
  });

  const bottomSheetInstance = currInstance || prevInstance || null;

  return (
    <ModalEngine
      animationDurationMs={DURATION_MS}
      isOpened={isOpen}
      closeOnBackdropClick
      onClose={handleBottomSheetClose}
    >
      {bottomSheetInstance && (
        <Container
          title={bottomSheetInstance.title}
          onClose={handleBottomSheetClose}
        >
          {bottomSheetInstance.content}
        </Container>
      )}
    </ModalEngine>
  );
}
