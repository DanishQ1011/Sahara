import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export default async function handler(req, res) {
  const { email, password } = req.body;

  try {
    const cookieStore = req.cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    await supabase.auth.signInWithPassword({ email, password });
    res.status(200).json({ message: 'Signin successful' });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}