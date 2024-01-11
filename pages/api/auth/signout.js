import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export default async function handler(req, res) {
  const cookieStore = req.cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  await supabase.auth.signOut();
  res.status(200).json({ message: 'Signout successful' });
}