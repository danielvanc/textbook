"use client";

import useEditableFields from "@/hooks/use-editableFields";
import Form from "next/form";
import Spinner from "../icons/spinner";
import { updatePostBody as action } from "@/app/actions";
import Editor from "@/components/editor";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";

function formatValue(value: string) {
  try {
    // Check if value looks like JSON
    const parsedValue = JSON.parse(value);
    // Generate HTML from JSON content if it has the expected structure
    if (parsedValue && parsedValue.type === "doc") {
      return generateHTML(parsedValue, [StarterKit]);
    }
    return value; // Return as-is if parsed but not proper doc format
  } catch (error) {
    console.log("error", error);
    // If parsing fails, it's not JSON, so return the original value
    return value;
  }
}

export default function EditableBody({
  content,
  postId,
}: {
  content: string;
  postId: string;
}) {
  const {
    state,
    isPending,
    isEditing,
    value,
    getFormProps,
    getEditorProps,
    getButtonProps,
  } = useEditableFields({ action, initialValue: content, type: "editor" });

  const postContent = formatValue(value);

  return (
    <>
      <h3 className="mt-3 text-3xl/8 font-semibold text-gray-900">
        {isEditing ? (
          <Form {...getFormProps()}>
            <p>
              <small className="field-tip">
                TIP: To save, click outside the content area
              </small>
            </p>
            <Editor
              content={value}
              props={{
                ...getEditorProps({
                  type: "textarea",
                  name: "content",
                  className: "w-full",
                  rows: 4,
                  cols: 5,
                  "aria-label": "Post content",
                  placeholder: "Write your post content here...",
                }),
              }}
            />
            <input type="hidden" name="postId" value={postId} />
          </Form>
        ) : (
          <div className="flex items-center text-left gap-x-2 relative">
            {isPending && (
              <span className="absolute -left-6">
                <Spinner />
              </span>
            )}
            <button
              {...getButtonProps({ className: "w-3/4 text-left" })}
              disabled={isPending}
            >
              <div
                className="mt-5 line-clamp-3 text-lg/6 text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: postContent,
                }}
              />
            </button>
          </div>
        )}
      </h3>
      {state?.error && <p className="text-red-500">{state.message}</p>}
    </>
  );
}
