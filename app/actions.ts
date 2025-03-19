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
  const description = String(formData.get("description"));

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
    // TODO: Make less generic
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: "Failed to create post" };
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
    return {
      message: "Error updating the title!",
      postSlug: "",
      error: true,
      completed: false,
    };
  }
}

export async function updatePostDescription(
  prevState: EditableStateProps,
  formData: FormData
) {
  const postId = String(formData.get("postId"));
  const description = String(formData.get("description"));

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
    return {
      message: "Error updating the description!",
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

export async function bookmarkPost(formData: FormData) {
  const postId = String(formData.get("postId"));
  const userId = String(formData.get("userId"));

  try {
    await prisma.bookmark.create({
      data: {
        userId,
        postId,
      },
    });

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
