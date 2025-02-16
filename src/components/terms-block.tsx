"use client";

import AcceptTerms from "./sections-terms-page/accept-terms";
import ContactTerms from "./sections-terms-page/contact-terms";
import CookiesPolicy from "./sections-terms-page/cookies-policys";
import LimitationOfUse from "./sections-terms-page/limitation-of-use";
import RestrictUseOfService from "./sections-terms-page/restrict-useOfService";
import { useTranslation } from "./translation-provider";
import UseOfService from "./sections-terms-page/use-of-service";
import ChangeTermsOfUse from "./sections-terms-page/change-terms-of-use";
import BlockForAsidesForPagesLayout from "./block-for-asides-for-pages";

export default function TermsBlock() {
  const { t } = useTranslation();

  return (
    <BlockForAsidesForPagesLayout page={t("terms.title")}>
      <AcceptTerms />
      <UseOfService />
      <LimitationOfUse />
      <CookiesPolicy />
      <RestrictUseOfService />
      <ChangeTermsOfUse />
      <ContactTerms />
    </BlockForAsidesForPagesLayout>
  );
}
