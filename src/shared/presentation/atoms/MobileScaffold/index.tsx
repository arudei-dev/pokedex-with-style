import type { WithChildren } from "@/shared/lib/types/react";

export default function MobileScaffold({ children }: WithChildren) {
  return (
    <div className="flex items-center justify-center w-svw h-svh bg-gray-300">
      <div className="w-full max-w-150 h-full shadow-lg border bg-gray-50 overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}

MobileScaffold.Constraint = function Constraint({ children }: WithChildren) {
  return (
    <div className="mx-auto w-full max-w-150 h-full overflow-hidden relative pointer-events-none *:pointer-events-auto">
      {children}
    </div>
  );
};
