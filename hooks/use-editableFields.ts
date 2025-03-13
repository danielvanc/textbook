"use client";

import { type Editor } from "@tiptap/react";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { toast } from "sonner";
interface EditableFieldsProps {
  action: (
    initialState: EditableStateProps,
    formData: FormData
  ) => Promise<EditableStateProps>;
  initialValue: string;
  type?: "text" | "textarea" | "editor";
}

const initialState = {
  message: "",
  error: false,
  postSlug: "",
  completed: false,
};

export default function useEditableFields({
  action,
  initialValue,
  type = "text",
}: EditableFieldsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const fieldRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [
    state = {
      message: "",
      error: false,
      postSlug: "",
      completed: false,
    },
    formAction,
    isPending,
  ] = useActionState(action, initialState);

  useEffect(() => {
    if (!state.completed) return;

    if (type === "text") {
      window.history.replaceState(null, "", `/home/posts/${state.postSlug}`);
    }

    toast(state.message);
    state.completed = false;
    state.postSlug = "";
    state.message = "";
  }, [state, type]);

  function getFormProps<Props>(props?: Props & React.ComponentProps<"form">) {
    return {
      ref: formRef,
      action: formAction,
      onSubmit: async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        flushSync(() => {
          setValue(fieldRef.current?.value ?? "");
          setIsEditing(false);
        });
        buttonRef.current?.focus();
        startTransition(() => {
          formAction(formData);
        });
      },
      ...props,
    };
  }

  function getFieldProps<Props>(
    props?: Props &
      Pick<
        React.ComponentProps<"input" | "textarea">,
        "onKeyDown" | "onBlur"
      > & {
        onKeyDown?: (event: React.KeyboardEvent) => void;
        onBlur?: (
          event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => void;
      }
  ) {
    return {
      required: true,
      name: "title",
      type,
      defaultValue: value,
      ref: fieldRef,
      className: "",
      "aria-label": "Edit title input",
      placeholder: "Update title",
      onKeyDown: (event: React.KeyboardEvent) => {
        if (event.key === "Escape") {
          flushSync(() => {
            setIsEditing(false);
          });
          buttonRef.current?.focus();
        }
      },
      onBlur: () =>
        // event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
        {
          flushSync(() => {
            // setValue(event.currentTarget.value);
            setIsEditing(false);
          });
          buttonRef.current?.focus();
        },
      ...props,
    };
  }

  function getEditorProps<Props>(
    props?:
      | (Props &
          Pick<
            React.ComponentProps<"input" | "textarea">,
            "onKeyDown" | "onBlur"
          >)
      | (Editor & {
          onKeyDown?: (event: React.KeyboardEvent) => void;
          onBlur?: (
            event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => void;
        })
  ) {
    return {
      required: true,
      name: "title",
      type,
      defaultValue: value,
      ref: fieldRef,
      formRef,
      className: "",
      "aria-label": "Edit content",
      placeholder: "Update content",
      setValue,
      setIsEditing,
      onKeyDown: (event: React.KeyboardEvent) => {
        if (event.key === "Escape") {
          flushSync(() => {
            setIsEditing(false);
          });
          buttonRef.current?.focus();
        }
      },
      onBlur: (
        event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const content = generateHTML(JSON.parse(event.currentTarget.value), [
          StarterKit,
        ]);

        flushSync(() => {
          setValue(content);
          setIsEditing(false);
        });
        buttonRef.current?.focus();
      },
      ...props,
    };
  }

  function getButtonProps<Props>(
    props?: Props & Pick<React.ComponentProps<"button">, "onClick">
  ) {
    return {
      type: "button" as const,
      ref: buttonRef,
      "aria-label": "Edit title button",
      onClick: () => {
        flushSync(() => {
          setIsEditing(true);
        });
        fieldRef.current?.select();
      },
      ...props,
    };
  }

  return {
    state,
    isPending,
    isEditing,
    value,
    setValue,
    getFormProps,
    getFieldProps,
    getEditorProps,
    getButtonProps,
  };
}
