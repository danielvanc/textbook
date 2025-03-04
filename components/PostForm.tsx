"use client";
import Editor from "@/components/editor";
import { Button } from "./ui/button";
import Form from "next/form";
import { createPost } from "@/app/actions";

export default function PostForm({ userId }: { userId: string }) {
  return (
    <Form
      action={createPost}
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
      <Button className="w-[120px] cursor-pointer">Publish</Button>
    </Form>
  );
}
