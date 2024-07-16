import ContentBlock from "@/components/shared/ContentBlock";
import H1 from "@/components/misc/H1";

const AccountPage = () => {
  return (
    <main>
      <H1 className="my-8 text-offWhite">Account</H1>

      <ContentBlock className="flex h-[500px] items-center justify-center">
        <p>Logged in as...</p>
      </ContentBlock>
    </main>
  );
};

export default AccountPage;
