import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

interface RequestBody {
  userId: string;
  email: string;
  name: string;
}

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { userId, email, name } = (await req.json()) as RequestBody;

    // Create a Supabase client with service role key for admin operations
    const supabaseAdmin = createClient(
      supabaseUrl,
      supabaseAnonKey
    );

    // Create user profile with admin privileges (bypasses RLS)
    const { error } = await supabaseAdmin.from("users").insert({
      id: userId,
      email,
      name,
      role: "student",
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
      progress: {
        level: 0,
        completedLessons: [],
        streakDays: 0,
        totalPoints: 0,
        achievements: [],
        assessmentScore: 0,
        lastActiveDate: "",
        lessonScores: {},
        quizAttempts: {}
      }
    });

    if (error) {
      // If user already exists, that's fine
      if (error.code === "23505") { // unique violation
        return new Response(JSON.stringify({ success: true, message: "User profile already exists" }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      }
      throw error;
    }

    return new Response(
      JSON.stringify({ success: true, message: "User profile created" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error creating user profile:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
