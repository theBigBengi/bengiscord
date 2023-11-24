"use client";

import { UserButton as ClerkUserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function UserButton() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return "d";

  return (
    <>
      <ClerkUserButton
        afterSignOutUrl='/'
        appearance={{
          elements: {
            avatarBox: "h-[48px] w-[48px]",
          },
        }}
      />
    </>
  );
}
