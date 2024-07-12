import Image from "next/image";
import logo from "public/logo.svg";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"}>
      <Image src={logo} alt="PetSoft Logo" />
    </Link>
  );
};

export default Logo;
