import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("members")
    .select("*")
    .limit(1);

  if (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }

  return Response.json({
    success: true,
    message: "Supabase connected successfully!",
    data,
  });
}