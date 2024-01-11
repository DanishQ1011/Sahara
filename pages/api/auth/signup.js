import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export default async function handler(req, res) {
  const { email, password, confirmPassword } = req.body;

  // Validate password match
  if (password !== confirmPassword) {
    res.status(400).json({ error: 'Passwords do not match' });
    return;
  }

  try {
    const cookieStore = req.cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    await supabase.auth.signUp({ email, password });
    res.status(200).json({ message: 'Signup successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}