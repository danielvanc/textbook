"use client";

import useEditableFields from "@/hooks/use-editableFields";
import Form from "next/form";
import Spinner from "../icons/spinner";
import { updatePostBody as action } from "@/app/actions";
import Editor from "@/components/editor";
import { formatValue } from "@/utils/posts";

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
      <div className="text-3xl/8 font-semibold text-gray-900">
        {isEditing ? (
          <Form {...getFormProps()}>
            <p>
              <small className="field-tip">
                TIP: To save, make a change then click outside the content area
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
              <span className="absolute -left-8">
                <Spinner />
              </span>
            )}
            <button
              {...getButtonProps({ className: "w-3/4 text-left" })}
              disabled={isPending}
            >
              <div
                className="text-lg/6 text-gray-600 font-normal"
                dangerouslySetInnerHTML={{
                  __html: postContent,
                }}
              />
            </button>
          </div>
        )}
      </div>
      {state?.error && <p className="text-red-500">{state.message}</p>}
    </>
  );
}
