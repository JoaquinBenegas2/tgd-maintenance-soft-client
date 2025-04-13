"use server";

import { signOut } from "@/config/auth";

export async function handleSignOut() {
  await signOut();
}
