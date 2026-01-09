"use client";

import { Box } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Skeleton } from "@/app/components";

const LoadingSkeleton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // show skeleton ONLY if loading takes more than 200ms
    const timer = setTimeout(() => {
      setVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <Box className="max-w-xl space-y-3">
      {/* Title input */}
      <Skeleton height={40} />

      {/* Markdown editor */}
      <Skeleton height={120} />

      {/* Submit button */}
      <Skeleton width={120} height={40} />
    </Box>
  );
};

export default LoadingSkeleton;
