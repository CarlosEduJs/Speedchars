"use client";

import Introduction from "./sections-privacy-page/introduction";
import DataCollection from "./sections-privacy-page/data-collection";
import Cookies from "./sections-privacy-page/cookies";
import SecurityData from "./sections-privacy-page/security-data";
import RightsUser from "./sections-privacy-page/rights-user";
import ChangePrivacy from "./sections-privacy-page/change-privacy";
import Contact from "./sections-privacy-page/contact";
import { useTranslation } from "./translation-provider";

import BlockForAsidesForPagesLayout from "./block-for-asides-for-pages";

export default function PrivacyBlock() {
  const { t } = useTranslation();
  return (
    <BlockForAsidesForPagesLayout page={t("privacy.title")}>
      <Introduction />
      <DataCollection />
      <Cookies />
      <SecurityData />
      <RightsUser />
      <ChangePrivacy />
      <Contact />
    </BlockForAsidesForPagesLayout>
  );
}
