"use client";
import Editor from "@/components/editor";
import Form from "next/form";
import { useActionState } from "react";

type PostFormProps = {
  userId: string;
  action: (formData: FormData) => Promise<{ message: string }>;
  children: React.ReactNode;
};

const initialState = {
  message: '',
}
export default function PostForm({ userId, action, children }: PostFormProps) {
  const [state, formAction] = useActionState(
    (state: { message: string }, formData: FormData) => action(formData),
    initialState
  );
  return (
    <Form
      action={formAction}
      className="flex flex-col gap-y-4 [&>p]:flex gap-4 [&>p]:justify-between [&>label]: [&>p>input]:border-1 [&>p>input]:p-2"
    >
      <input type="hidden" name="userId" defaultValue={userId} />
      <p>
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="block w-full"
          placeholder="Title"
        />
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
      <Editor />
      {state?.message && <p className="text-red-500">{state.message}</p>}
      {children}
    </Form>
  );
}
