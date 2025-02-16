
import Link from "next/link";
import { RainbowButton } from "./magicui/rainbow-button";

type BtnCtaProps = {
  href: string;
  text: string;
  icon?: React.ReactNode;
};

export default function BtnCta({ href, text, icon }: BtnCtaProps) {
  return (
    <Link href={href}>
      <RainbowButton className="text-muted text-xs flex gap-2 items-center px-4 h-fit transition-transform duration-300 ease-in-out transform hover:scale-105">
        {icon}
        {text}
      </RainbowButton>
    </Link>
  );
}
