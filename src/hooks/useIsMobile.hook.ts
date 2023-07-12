import { useEffect, useState } from "react";
import debounce from "lodash/debounce";

import { useIsomorphicLayoutEffect } from "@/hooks";

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  // exec at least once
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", debounce(updateSize, 100));
    return (): void => window.removeEventListener("resize", updateSize);
  }, []);

  return isMobile;
};

export default useIsMobile;
