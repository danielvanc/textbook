"use server";
import { signIn, signOut } from "@/auth";
import config from "@/utils/config";
import { prisma } from "@/utils/db";
import { generateSlug } from "@/utils/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import {
  editDescriptionSchema,
  editTitleSchema,
  newPostSchema,
} from "@/lib/schemas";
import type { SubmissionResult } from "@conform-to/react";

const errorResponse = {
  error: true,
  completed: false,
};

export async function logInUser() {
  await signIn("google", { redirectTo: config.appRoute });
}

export async function logOutUser() {
  await signOut();
}

export async function createPost(
  prevState: unknown,
  formData: FormData
): Promise<SubmissionResult<string[]> | undefined> {
  const userId = String(formData.get("userId"));
  const title = String(formData.get("title"));
  const content = String(formData.get("content"));
  const description = String(formData.get("description"));

  const submission = parseWithZod(formData, { schema: newPostSchema });

  if (submission.status !== "success") {
    submission.reply({
      formErrors: ["Incorrect data supplied, please check your input."],
    });
  }

  try {
    await prisma.$transaction(async (tx) => {
      const post = await tx.post.create({
        data: {
          title,
          content,
          description,
          ownerId: userId,
        },
        select: {
          id: true,
        },
      });

      const slug = generateSlug(title, post.id);

      await tx.post.update({
        where: { id: post.id },
        data: {
          slug,
        },
      });
    });
  } catch (error) {
    console.error(error);

    return submission.reply({
      formErrors: [
        "There were problems while creating the post. Please try again",
      ],
    });
  }

  redirect("/home/posts");
}

export async function deletePost(formData: FormData) {
  const postId = String(formData.get("postId"));

  try {
    await prisma.post.delete({
      where: { id: postId },
    });
  } catch (error) {
    console.error(error);
    return {
      message: "Error deleting post!",
      error: true,
    };
  }

  redirect("/home/posts");
}

export async function updatePostTitle(
  prevState: EditableStateProps,
  formData: FormData
) {
  const postId = String(formData.get("postId"));
  const title = String(formData.get("title"));
  const slug = generateSlug(title, postId);
  const errors = {
    ...errorResponse,
    message: "Error updating the title!",
    postSlug: "",
  };
  const result = editTitleSchema.safeParse(title);

  if (!result.success) {
    return { ...errors, message: result.error.format()._errors[0] };
  }

  try {
    await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        slug,
      },
    });

    return {
      message: "Title was successfully updated!",
      postSlug: slug,
      error: false,
      completed: true,
    };
  } catch (error) {
    console.error(error);
    return errors;
  }
}

export async function updatePostDescription(
  prevState: EditableStateProps,
  formData: FormData
) {
  const postId = String(formData.get("postId"));
  const description = String(formData.get("description"));

  const errors = {
    ...errorResponse,
    message: "Error updating the Description!",
    postSlug: "",
  };

  const result = editDescriptionSchema.safeParse(description);

  if (!result.success) {
    return { ...errors, message: result.error.format()._errors[0] };
  }

  try {
    await prisma.post.update({
      where: { id: postId },
      data: {
        description,
      },
    });

    return {
      message: "Description was successfully updated!",
      error: false,
      completed: true,
    };
  } catch (error) {
    console.error(error);
    return errors;
  }
}

export async function updatePostBody(
  prevState: EditableStateProps,
  formData: FormData
) {
  const postId = String(formData.get("postId"));
  const content = String(formData.get("content"));

  try {
    await prisma.post.update({
      where: { id: postId },
      data: {
        content,
      },
      select: {
        slug: true,
        title: true,
        content: true,
        updatedAt: true,
      },
    });

    return {
      message: "Content was successfully updated!",
      error: false,
      completed: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Error updating the content.",
      postSlug: "",
      error: true,
      completed: false,
    };
  }
}

export async function addBookmark(formData: FormData) {
  const postId = String(formData.get("postId"));
  const userId = String(formData.get("userId"));

  try {
    await prisma.bookmark.create({
      data: {
        userId,
        postId,
      },
    });

    revalidatePath(`/home/*`);

    return {
      success: true,
      message: "Post bookmarked successfully!",
      error: false,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error bookmarking post!",
      error: true,
    };
  }
}

export async function removeBookmark(formData: FormData) {
  const bookmarkId = String(formData.get("bookmarkId"));

  try {
    await prisma.bookmark.delete({
      where: { id: bookmarkId },
    });

    revalidatePath(`/home/*`);

    return {
      success: true,
      message: "Bookmark removed successfully!",
      error: false,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error removing bookmark!",
      error: true,
    };
  }
}
