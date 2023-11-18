"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { config } from "@/config/config";
import { useIsMobile } from "@/hooks";
import PrimaryButton from "@/components/ui/PrimaryButton";

const NewsPopup: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const update = localStorage.getItem(config.localStorage.newsPopup);
    if (!update) setVisible(true);
  }, []);

  const handleConfirm = () => {
    localStorage.setItem(config.localStorage.newsPopup, "yes");
    setVisible(false);
  };

  const position = isMobile ? -160 : -80;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed -bottom-40 left-0 flex w-full flex-col items-center justify-between gap-4 bg-dark-500 px-8 py-4 shadow-lg shadow-black md:-bottom-20 md:flex-row"
          animate={{ y: [0, position] }}
          exit={{ y: [position, 0] }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div>
            <p className="font-medium">
              ⚡ From now on, only CS2 stats will be shown on match pages!
            </p>
          </div>
          <div className="max-md:w-full">
            <PrimaryButton
              onClick={handleConfirm}
              className="justify-center max-md:w-full"
              tabIndex={2}
            >
              Close
            </PrimaryButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsPopup;
