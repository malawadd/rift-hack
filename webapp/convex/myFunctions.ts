import { v } from "convex/values";
import { query } from "./_generated/server";

export const exampleQuery = query({
  args: { message: v.optional(v.string()) },
  handler: async () => {
    return { success: true };
  },
});
