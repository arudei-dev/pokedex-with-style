import { XIcon } from "lucide-react";

import type { WithChildren } from "@/shared/lib/types/react";
import MobileScaffold from "@/shared/presentation/atoms/MobileScaffold";

export interface ContainerProps extends WithChildren {
  title: string;
  onClose?: () => void;
}

export default function Container(props: ContainerProps) {
  const { title, children, onClose } = props;

  return (
    <MobileScaffold.Constraint>
      <div className="absolute z-[100] bottom-0 left-0 right-0 h-[80svh] bg-white rounded-t-2xl grid grid-rows-[auto_1fr]">
        <div className="flex items-center justify-center py-8 relative">
          <h1 className="text-2xl font-bold pt-1">{title}</h1>

          <button
            type="button"
            className="absolute top-8 right-8 bg-gray-100 p-2 rounded-full"
            onClick={onClose}
          >
            <XIcon className="size-6" />
          </button>
        </div>

        <div className="size-full flex flex-col">{children}</div>
      </div>
    </MobileScaffold.Constraint>
  );
}
