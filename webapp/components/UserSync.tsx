"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";

export function UserSync() {
  const { user } = useUser();
  const createOrUpdateUser = useMutation(api.users.createOrUpdateUser);

  useEffect(() => {
    if (user) {
      const handle =
        user.username ||
        user.emailAddresses[0]?.emailAddress.split("@")[0] ||
        "user";

      createOrUpdateUser({
        clerkId: user.id,
        handle,
        region: "NA",
      }).catch((error) => {
        console.error("Failed to sync user:", error);
      });
    }
  }, [user, createOrUpdateUser]);

  return null;
}
