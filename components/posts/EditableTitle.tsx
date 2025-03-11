"use client";

import { updatePostTitle } from "@/app/actions";
import Form from "next/form";
import { useRouter } from "next/navigation";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";

const initialState = {
  message: "",
  error: false,
  postSlug: "",
};

export default function EditableTitle({
  id,
  title,
  postId,
}: {
  id: string;
  title: string;
  postId: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const [state, formAction] = useActionState(
    (
      state: { message: string; error: boolean; postSlug?: string },
      formData: FormData
    ) => updatePostTitle(formData),
    initialState
  );

  useEffect(() => {
    if (!isEditing && state?.postSlug) {
      window.history.replaceState(null, "", `/home/posts/${state.postSlug}`);
    }
  }, [isEditing, state.postSlug, state.error, router]);

  return (
    <>
      <h3 className="mt-3 text-3xl/8 font-semibold text-gray-900">
        {isEditing ? (
          <Form
            action={formAction}
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              flushSync(() => {
                setNewTitle(inputRef.current?.value ?? "");
                setIsEditing(false);
              });
              buttonRef.current?.focus();
              startTransition(() => {
                formAction(formData);
              });
              console.log("Submitted!");
            }}
          >
            <input
              required
              ref={inputRef}
              type="text"
              defaultValue={newTitle}
              id={id}
              name="title"
              aria-label="Edit title input"
              placeholder="Update title"
              className="w-full"
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  flushSync(() => {
                    setIsEditing(false);
                  });
                  buttonRef.current?.focus();
                }
              }}
              onBlur={(event) => {
                flushSync(() => {
                  setNewTitle(event.currentTarget.value);
                  setIsEditing(false);
                });
                buttonRef.current?.focus();
              }}
            />
            <input type="hidden" name="postId" value={postId} />
          </Form>
        ) : (
          <button
            aria-label="Edit title button"
            type="button"
            ref={buttonRef}
            onClick={() => {
              flushSync(() => {
                setIsEditing(true);
              });
              inputRef.current?.select();
            }}
          >
            {newTitle}
          </button>
        )}
      </h3>
      {state?.message && (
        <p className={`${state.error ? "text-red-500" : "text-green-500"}`}>
          {state.message}
        </p>
      )}
    </>
  );
}
