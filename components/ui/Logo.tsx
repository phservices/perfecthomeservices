import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="">
      <div className="h-[68px] w-[161px]">
        <Image
          src="/images/logo.png"
          height={200}
          width={200}
          alt="logo"
          className="h-full w-full object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;
