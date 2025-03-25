"use client";
import Editor from "@/components/editor";
import { parseWithZod } from "@conform-to/zod";
import { useForm, type SubmissionResult } from "@conform-to/react";
import { useActionState } from "react";
import { newPostSchema } from "@/lib/schemas";

type PostFormProps = {
  userId: string;
  action: (
    prevState: unknown,
    formData: FormData
  ) => Promise<SubmissionResult<string[]> | undefined>;
  children: React.ReactNode;
};

export default function PostForm({ userId, action, children }: PostFormProps) {
  const [state, formAction] = useActionState(action, undefined);

  const [form, fields] = useForm({
    shouldValidate: "onSubmit",
    shouldRevalidate: "onInput",
    lastResult: state,
    onValidate: ({ formData }: { formData: FormData }) =>
      parseWithZod(formData, { schema: newPostSchema }),
  });

  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={formAction}
      className="flex flex-col gap-y-4 [&>p]:flex gap-4 [&>p]:justify-between [&>label]: [&>p>input]:border-1 [&>p>input]:p-2"
      noValidate
    >
      <input type="hidden" name="userId" defaultValue={userId} />
      <p className="flex flex-col gap-2">
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          type="text"
          key={fields.title.key}
          name={fields.title.name}
          defaultValue={fields.title.value}
          className="block w-full"
          placeholder="Title"
          required
        />
        <span className=" text-red-500">{fields.title.errors}</span>
      </p>
      {/* TODO: Enable image upload*/}
      {/* <p>
        <label htmlFor="thumbnail" className="">
          Thumbnail
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            placeholder="Thumbnail"
            className="ml-4"
            accept="image/*"
          />
        </label>
      </p> */}
      <p className="flex flex-col gap-2">
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <input
          type="text"
          key={fields.description.key}
          name={fields.description.name}
          defaultValue={fields.description.value}
          className="block w-full"
          placeholder="Description"
          required
        />
        <span className="text-red-500">{fields.description.errors}</span>
      </p>
      <Editor />
      {form.errors && <p className="text-red-500">{form.errors}</p>}
      {children}
    </form>
  );
}
