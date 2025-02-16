import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Branding({ isSrOnly }: { isSrOnly: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src={"/logo.png"} alt="logo" width={32} height={32} />
      <h1 className={cn("text-xl font-bold", isSrOnly && "sr-only")}>
        speedchars
      </h1>
      {!isSrOnly && (
        <p className="w-fit px-3 flex items-center justify-center h-5 bg-muted rounded-sm text-xs">
          Beta
        </p>
      )}
    </Link>
  );
}
