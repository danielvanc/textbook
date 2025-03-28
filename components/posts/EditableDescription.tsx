"use client";

import useEditableFields from "@/hooks/use-editableFields";
import Form from "next/form";
import Spinner from "../icons/spinner";
import { updatePostDescription as action } from "@/app/actions";

export default function EditableDescription({
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
    getFieldProps,
    getButtonProps,
  } = useEditableFields({ action, initialValue: content, type: "textarea" });

  return (
    <>
      <div className="mt-3 mb-8 text-3xl/8 font-semibold text-gray-900">
        {isEditing ? (
          <Form {...getFormProps()}>
            <p>
              <span>
                <label
                  htmlFor="description"
                  className="sr-only"
                  aria-label="Post description"
                  title="Post description"
                >
                  Post description
                </label>
                <small className="field-tip">
                  TIP: To save, hit ENTER or to cancel, hit ESC
                </small>
              </span>
              {/* TODO: Change to a textarea field */}
              <input
                {...getFieldProps({
                  className: "w-full mb-8 text-lg font-normal",
                  id: "description",
                  name: "description",
                  placeholder: "Enter a description",
                })}
              />
            </p>
            <input type="hidden" name="postId" value={postId} />
          </Form>
        ) : (
          <div className="flex items-center text-left gap-x-2 relative">
            {isPending && (
              <span className="absolute -left-6 top-2">
                <Spinner />
              </span>
            )}
            <button
              {...getButtonProps({ className: "w-3/4" })}
              disabled={isPending}
              className="text-lg text-left font-normal"
            >
              {value}
            </button>
          </div>
        )}
        {state?.error && (
          <p className="text-red-500 text-sm">{state.message}</p>
        )}
      </div>
    </>
  );
}
