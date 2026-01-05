"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
// import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import dynamic from "next/dynamic";
import ErrorMessage from "@/app/components/ErrorMessage";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

// interface NewIssuesForm {
//   title: string;
//   description: string;
// }

type NewIssuesForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewIssuesForm>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const router = useRouter();

  const [error, setError] = useState("");

  return (
    <div className="max-w-xl space-y-2">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-2"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected error occurred. Please try again.");
          }
        })}
      >
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
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
