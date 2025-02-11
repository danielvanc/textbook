"use server";
import { signIn, signOut } from "@/auth";
import config from "@/utils/config";

export async function logInUser() {
  await signIn("google", { redirectTo: config.appRoute });
}

export async function logOutUser() {
  await signOut();
}
