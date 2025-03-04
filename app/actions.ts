"use server";
import { signIn, signOut } from "@/auth";
import config from "@/utils/config";
import { prisma } from "@/utils/db";
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
    await prisma.post.create({
      data: {
        title,
        content,
        ownerId: userId,
      },
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
