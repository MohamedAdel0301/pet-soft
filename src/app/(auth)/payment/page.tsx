"use client";
import { createCheckoutSession } from "@/actions/payment-actions";
import H1 from "@/components/misc/H1";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <main className="flex flex-col gap-2">
      <H1>Petsoft Requires Payment</H1>
      <Button onClick={async () => await createCheckoutSession()}>
        Buy lifetime access
      </Button>
    </main>
  );
};

export default page;
