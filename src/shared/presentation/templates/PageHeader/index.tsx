import { FlameIcon } from "lucide-react";

export default function PageHeader() {
  return (
    <div className="absolute top-0 left-0 right-0 w-full px-6 py-4 bg-white shadow-lg/5 border-b flex items-center gap-x-2 z-[999]">
      <div className="size-8 rounded border-2 flex items-center justify-center border-red-500 bg-red-50">
        <FlameIcon className=" text-red-500" />
      </div>
      <h1 className="pt-1 text-2xl font-bold">Pokédex Builder</h1>
    </div>
  );
}
