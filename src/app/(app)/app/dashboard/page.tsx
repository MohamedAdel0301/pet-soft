import ContentBlock from "@/components/ContentBlock";
import Branding from "@/components/dashboard/Branding";
import PetDetails from "@/components/dashboard/PetDetails";
import PetList from "@/components/dashboard/PetList";
import Stats from "@/components/dashboard/Stats";
import SearchForm from "@/components/ui/SearchForm";
import React from "react";

const DashboardPage = async () => {
  return (
    <main>
      <section className="flex items-center justify-between py-8 text-white">
        <Branding />
        <Stats />
      </section>

      <section className="grid grid-rows-[45px_350px_500px] gap-4 md:h-[600px] md:grid-cols-3 md:grid-rows-[45px_1fr]">
        <div className="md:col-span-1 md:col-start-1 md:row-span-1 md:row-start-1">
          <SearchForm />
        </div>

        <div className="md:col-span-1 md:col-start-1 md:row-span-full md:row-start-2">
          <ContentBlock>
            <PetList />
          </ContentBlock>
        </div>
        <div className="md:col-span-full md:col-start-2 md:row-span-full md:row-start-1">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
