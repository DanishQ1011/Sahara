'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignUpForm(){

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter()

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUser(){
        const {data: {user}} = await supabase.auth.getUser()
        setUser(user)
        setLoading(false)
    }

    getUser();
  }, [])

  // const handleSignUp = async () => {
  //   await supabase.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       emailRedirectTo: `${location.origin}/auth/callback`
  //     }
  //   })
  //   setUser(res.data.user)
  //   router.refresh();
  //   setEmail('')
  //   setPassword('')
  // }

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please make sure both passwords are the same.");
      return;
    }

    try {
      const res = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
        }
      });

      setUser(res.data.user);
      router.refresh();
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error("Sign-up error:", error);
      // Handle the sign-up error, e.g., show a user-friendly error message
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setUser(null)
  }

  console.log({loading, user})

  if (loading){
      return <h1>loading..</h1>
  }

  if (user){
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-96 text-center">
            <p className="mb-4 text-xl font-bold text-gray-700 dark:text-gray-300">
                You're already logged in
            </p>
            <div className="col-12">
            <button
              onClick={handleLogout}
              className="button py-20 -dark-1 bg-blue-1 text-white w-100"
            >
              Log out <div className="icon-arrow-top-right ml-15" />
            </button>
          </div>
        </div>
    </div>
    )
}

  return (
    <form className="row y-gap-20">
      <div className="col-12">
        <h1 className="text-22 fw-500">Welcome</h1>
        <p className="mt-10">
          Already have an account yet?{" "}
          <Link href="/login" className="text-blue-1">
            Log in
          </Link>
        </p>
      </div>
      {/* End .col */}

      {/* <div className="col-12">
        <div className="form-input ">
          <input type="text" required />
          <label className="lh-1 text-14 text-light-1">First Name</label>
        </div>
      </div> */}
      {/* End .col */}

      {/* <div className="col-12">
        <div className="form-input ">
          <input type="text" required />
          <label className="lh-1 text-14 text-light-1">Last Name</label>
        </div>
      </div> */}
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input 
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  
            required 
          />
          <label className="lh-1 text-14 text-light-1">Email</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input 
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <label className="lh-1 text-14 text-light-1">Password</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input">
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label className="lh-1 text-14 text-light-1">Confirm Password</label>
        </div>
      </div>

      <div className="col-12">
        <div className="d-flex ">
          <div className="form-checkbox mt-5">
            <input type="checkbox" name="name" />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
          </div>
          <div className="text-15 lh-15 text-light-1 ml-10">
            Email me exclusive Agoda promotions. I can opt out later as stated
            in the Privacy Policy.
          </div>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <button
          onClick={handleSignUp}
          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
        >
          Sign Up <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
      {/* End .col */}
    </form>
  );
};
