// pages/api/confirm/[token].js

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function handler(req, res) {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: "Token not provided" });
  }

  const supabase = createClientComponentClient();

  try {
    // Verify the email confirmation token
    const { user, error } = await supabase.auth.api.updateUser(token, {
      data: { confirmed: true }, // You can customize this based on your data model
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Redirect the user to the desired page (e.g., login page)
    res.redirect('/login');
  } catch (error) {
    console.error("Confirmation error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
