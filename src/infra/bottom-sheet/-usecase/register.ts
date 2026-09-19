import { type ComponentType, createElement } from "react";

import useHandler from "@/shared/lib/react-hooks/use-handler";

import { BottomSheetModel } from "../-model";

interface RegisterBottomSheetParams {
  title: string;
}

export default function registerBottomSheet(params: RegisterBottomSheetParams) {
  return <P extends {}>(BottomSheet: ComponentType<P>) => {
    return function useModal() {
      const emit = BottomSheetModel.useEmit();

      // biome-ignore lint/complexity/noBannedTypes: required by React constaints
      type OpenModal = [P] extends [null | undefined | never | {}]
        ? () => void
        : (props: P) => void;

      const openModal = useHandler((props?: P) => {
        emit("infra/bottom-sheet/open", {
          title: params.title,
          content: createElement(BottomSheet, props),
        });
      });

      const closeModal = useHandler(() => {
        emit("infra/bottom-sheet/close");
      });

      return [openModal as OpenModal, closeModal] as const;
    };
  };
}
