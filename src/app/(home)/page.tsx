import Logo from "@/components/home/Logo";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 lg:flex-row">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        alt="PetSoft's preview"
        width={519}
        height={472}
      />

      <section>
        <Logo />
        <h1 className="mb-6 mt-3 max-w-[500px] text-5xl font-semibold">
          Manage your pet daycare with{" "}
          <span className="font-extrabold">ease</span>
        </h1>
        <p className="max-w-[400px] text-2xl font-medium">
          Use PetSoft to easily track pets under your care. Get lifetime access
          for $100
        </p>
      </section>
    </main>
  );
}
