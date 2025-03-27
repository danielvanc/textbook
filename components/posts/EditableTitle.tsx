"use client";

import useEditableFields from "@/hooks/use-editableFields";
import Form from "next/form";
import Spinner from "../icons/spinner";
import { updatePostTitle as action } from "@/app/actions";

export default function EditableTitle({
  title,
  postId,
}: {
  title: string;
  postId: string;
}) {
  const {
    state,
    isPending,
    isEditing,
    value,
    getFormProps,
    getFieldProps,
    getButtonProps,
  } = useEditableFields({ action, initialValue: title });

  return (
    <>
      <h3 className="mt-3 mb-8 text-3xl/8 font-semibold text-gray-900">
        {isEditing ? (
          <Form {...getFormProps()}>
            <p>
              <span>
                <label
                  htmlFor="title"
                  className="sr-only"
                  aria-label="Post title"
                  title="Post title"
                >
                  Post title
                </label>
                <small className="field-tip">
                  TIP: To save, hit ENTER or to cancel, hit ESC
                </small>
              </span>
              <input
                {...getFieldProps({
                  className: "w-full mb-8",
                })}
              />
            </p>
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
              {value}
            </button>
          </div>
        )}
        {state?.error && (
          <small className="text-red-500 block text-sm">{state.message}</small>
        )}
      </h3>
    </>
  );
}
