"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useTranslation } from "./translation-provider";
import Link from "next/link";

export default function AcceptCookies() {
  const [isAccepted, setIsAccepted] = useState(false);
  const { t } = useTranslation();

  const handleAccept = () => {
    setIsAccepted(true);
    localStorage.setItem("cookiesAccepted", "true");
  };

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (cookiesAccepted) {
      setIsAccepted(true);
    }
  }, []);

  if (isAccepted) return null;

  return (
    <div className="fixed bottom-2 right-0 w-fit bg-background border rounded-md px-4 py-2 flex-col gap-2 flex items-center justify-center">
      <p className="text-sm text-muted-foreground max-w-md">
        {t("accept_cookies.description")}
        {" "}
        <Link href="/privacy" className="text-primary underline">
        {t("accept_cookies.click_here")}
        </Link>
      </p>
      <Button onClick={handleAccept} variant={"outline"}>
        {t("accept_cookies.button")}
      </Button>
    </div>
  );
}
