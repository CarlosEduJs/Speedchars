"use client";

import Branding from "./branding";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ModeToggle from "./mode-toggle";
import SelectLanguageDropdown from "./select-language-dropdown";
import { SettingsDialog } from "./settings-dialog";

export default function HeaderApp() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 flex justify-between px-5 py-4 z-10 backdrop-blur-lg transition-all duration-300 ${
        scrolled ? "py-2 shadow-lg" : "py-4 shadow-md"
      }`}
    >
      <Branding isSrOnly={false} />
      <nav className="flex items-center gap-4">
        <SettingsDialog />
      </nav>
    </motion.header>
  );
}
