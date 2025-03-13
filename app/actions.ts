"use server";
import { signIn, signOut } from "@/auth";
import config from "@/utils/config";
import { prisma } from "@/utils/db";
import { generateSlug } from "@/utils/posts";
import { redirect } from "next/navigation";

export async function logInUser() {
  await signIn("google", { redirectTo: config.appRoute });
}

export async function logOutUser() {
  await signOut();
}

export async function createPost(formData: FormData) {
  const userId = String(formData.get("userId"));
  const title = String(formData.get("title"));
  const content = String(formData.get("content"));

  try {
    await prisma.$transaction(async (tx) => {
      const post = await tx.post.create({
        data: {
          title,
          content,
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
    // TODO: Make less generic
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: "Failed to create post" };
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

  try {
    await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        slug,
      },
    });

    return {
      message: "Successfully updated the title!",
      postSlug: slug,
      error: false,
      completed: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Error updating title!",
      postSlug: "",
      error: true,
      completed: false,
    };
  }
}

export async function updatePostBody(
  prevState: EditableStateProps,
  formData: FormData
) {
  const postId = String(formData.get("postId"));
  const content = String(formData.get("content")); // changed variable name to content
  try {
    await prisma.post.update({
      where: { id: postId },
      data: {
        content, // updated data to include content
      },
      select: {
        slug: true,
        title: true,
        content: true,
        updatedAt: true,
      },
    });

    return {
      message: "Successfully updated the content!",
      error: false,
      completed: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Error updating content!",
      postSlug: "",
      error: true,
      completed: false,
    };
  }
}
