import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies(request.headers);
    const supabase = createRouteHandlerClient({ cookies: cookieStore });
    
    // Exchange code for session
    const { user, session, error } = await supabase.auth.api.setAuthCookie(request.headers);
    
    if (error) {
      console.error('Error setting auth cookie:', error);
    }
  }

  return NextResponse.redirect(requestUrl.origin);
}
