"use client";

import { Grid2X2Icon } from "lucide-react";

import { Catalog } from "@/features/catalog";
import { YourTeamUi } from "@/features/your-team";

import EntitiesModelProvider from "@/shared/entities";
import PageFooter from "@/shared/presentation/templates/PageFooter";
import PageHeader from "@/shared/presentation/templates/PageHeader";

export default function Home() {
  const [openYourTeam] = YourTeamUi.useBottomSheet();

  return (
    <EntitiesModelProvider>
      <PageHeader />

      <div className="w-full h-full pt-18 pb-27 overflow-y-auto">
        <Catalog />
      </div>

      <PageFooter
        activeKey="catalog"
        items={[
          {
            key: "catalog",
            icon: Grid2X2Icon,
            text: "Catalog",
          },
          {
            key: "view-team",
            icon: Grid2X2Icon,
            text: "View Team",
          },
        ]}
        onClickItem={(key) => {
          if (key === "view-team") {
            openYourTeam();
          }
        }}
      />
    </EntitiesModelProvider>
  );
}
