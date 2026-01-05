import { z } from "zod";

// export const runtime = "nodejs";
export const createIssueSchema = z.object({
  title: z.string().min(3, "Title is required").max(255),
  description: z.string().min(3, "Description is required").max(5000),
});
