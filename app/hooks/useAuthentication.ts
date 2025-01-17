"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";

export default async function useAuthentication() {
  console.log("useAuthentication");
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }
}
