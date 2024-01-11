'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sendConfirmationEmail } from '../../utils/sendEmail';

export default function SignUpForm(){

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const handleSignUp = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
  
    if (password !== confirmPassword) {
      setPasswordMatchError('Passwords do not match');
      return;
    }
  
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (error) {
        setError(error.message);
      } else {
        // Send confirmation email with the confirmation link
        const confirmationLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/confirm/${user.id}`;
        // Note: Replace process.env.NEXT_PUBLIC_BASE_URL with your actual base URL
  
        // You can customize the email content based on your needs
        const emailContent = `Click the following link to confirm your email: ${confirmationLink}`;
  
        // Send the confirmation email (use your preferred email sending method)
        sendConfirmationEmail(user.email, emailContent);
  
        // Reset form fields, error state, and set signup success to true
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError(null);
        setSignupSuccess(true);
        setSignupSuccess(true);
        console.log('Signup successful. Signup success state:', signupSuccess);
      }
=======

   try {
      const { user, error } = await supabase.auth.signUp({ email, password });
      router.push('/'); // Redirect to home page on success
>>>>>>> parent of 3abca99 (Update SignUpForm.jsx)
    } catch (error) {
      setError(error.message);
    }
    setUser(res.data.user)
    router.refresh();
    setEmail('')
    setPassword('')
  }

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

      {/* <div className="col-12">
        <div className="form-input ">
          <input type="password" required />
          <label className="lh-1 text-14 text-light-1">Confirm Password</label>
        </div>
      </div> */}
      {/* End .col */}

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
