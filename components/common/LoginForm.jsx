'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Before try:", error, user, loading);
    try {
      const res = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log("After try:", error, user, loading);
      setError(null);
      router.push('/'); // Use router.push to navigate to the homepage
      // ... rest of your success logic
    } catch (error) {
      console.error(error);
      setError(error.message); // Display the error message to the user
      console.log("In catch:", error, user, loading);
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
        <h1 className="text-22 fw-500">Welcome back</h1>
        <p className="mt-10">
          Don&apos;t have an account yet?{" "}
          <Link href="/signup" className="text-blue-1">
            Sign up for free
          </Link>
        </p>
      </div>
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
        <a href="#" className="text-14 fw-500 text-blue-1 underline">
          Forgot your password?
        </a>
      </div>
      {/* End .col */}

      <div className="col-12">
        <button
          onClick={handleSignIn}
          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
        >
          Sign In <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
      {/* End .col */}
    </form>
  );
};

