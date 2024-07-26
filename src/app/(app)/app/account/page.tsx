import ContentBlock from "@/components/shared/ContentBlock";
import H1 from "@/components/misc/H1";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import SignoutBtn from "@/components/auth/SignoutBtn";

const AccountPage = async () => {
  const session = await auth();
  //check if middleware doesn't run
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <main>
      <H1 className="my-8 text-offWhite">Account</H1>

      <ContentBlock className="flex h-[500px] flex-col items-center justify-center gap-3">
        <p>Logged in as {session?.user?.email}</p>
        <SignoutBtn />
      </ContentBlock>
    </main>
  );
};

export default AccountPage;
