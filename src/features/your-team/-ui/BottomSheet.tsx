import { registerBottomSheet } from "@/infra/bottom-sheet";

export const useBottomSheet = registerBottomSheet({
  title: "Your Team",
})(() => {
  return (
    <div className="flex items-center justify-center">
      <h1 className="text-4xl font-bold">Coming soon</h1>
    </div>
  );
});
