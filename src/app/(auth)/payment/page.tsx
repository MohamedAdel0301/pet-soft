"use client";
import { createCheckoutSession } from "@/actions/payment-actions";
import H1 from "@/components/misc/H1";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

type TPaymentPage = {
  searchParams: {
    success?: string;
    cancelled?: string;
  };
};

const PaymentPage = ({ searchParams }: TPaymentPage) => {
  const [isPending, startTransition] = useTransition();

  return (
    <main className="flex flex-col items-center gap-2">
      <H1>Petsoft Requires Payment</H1>
      {!searchParams.success && (
        <Button
          disabled={isPending}
          onClick={async () => {
            startTransition(async () => {
              await createCheckoutSession();
            });
          }}
        >
          Buy lifetime access
        </Button>
      )}
      {searchParams.success && (
        <p className="text-sm text-green-700">
          Payment Successful, You now have lifetime access to Petsoft
        </p>
      )}
      {searchParams.cancelled && (
        <p className="text-sm text-red-500">Payment Cancelled</p>
      )}
    </main>
  );
};

export default PaymentPage;
