"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";

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

  return (
    <h3 className="mt-3 text-3xl/8 font-semibold text-gray-900">
      {/* Add an input field for modifying the title */}
      {isEditing ? (
        <form
          method="post"
          onSubmit={(event) => {
            event.preventDefault();
            flushSync(() => {
              setNewTitle(inputRef.current?.value ?? "");
              setIsEditing(false);
            });
            buttonRef.current?.focus();
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
        </form>
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
  );
}
