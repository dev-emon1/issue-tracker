"use client";

import { Box, Card, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Skeleton } from "@/app/components";

const LoadingSkeleton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // show skeleton ONLY if loading takes >= 200ms
    const timer = setTimeout(() => {
      setVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <Box className="max-w-3xl">
      {/* Title */}
      <Skeleton width={300} height={40} className="mb-4" />

      {/* Status + Date */}
      <Flex align="center" gap="4" className="my-2">
        <Skeleton width={80} height={20} />
        <Skeleton width={100} height={20} />
      </Flex>

      {/* Description */}
      <Card variant="surface" className="p-4 mb-4">
        <Skeleton count={5} />
      </Card>
    </Box>
  );
};

export default LoadingSkeleton;
