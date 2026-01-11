"use client";

import { Box, Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import dynamic from "next/dynamic";
import { ErrorMessage, Spinners } from "@/app/components";
import { Issue } from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssuesFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssuesFormData>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: issue?.title ?? "",
      description: issue?.description ?? "",
    },
  });

  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);

      if (issue) {
        // EDIT
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        // CREATE
        await axios.post("/api/issues", data);
      }

      router.push("/issues");
      router.refresh();
    } catch {
      setIsSubmitting(false);
      setError("An unexpected error occurred. Please try again.");
    }
  });

  return (
    <Box className="max-w-xl space-y-2">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-2" onSubmit={onSubmit}>
        <TextField.Root
          placeholder="Type issue title..."
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting} type="submit">
          Submit {isSubmitting && <Spinners />}
        </Button>
      </form>
    </Box>
  );
};

export default IssueForm;
