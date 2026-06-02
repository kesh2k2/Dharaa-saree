
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/src/utils/superbase'; // ඔයාගේ නිවැරදි path එක (උදා: ../utils/supabase) මෙතනට දාන්න

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(''); 
  const [mobileNumber, setMobileNumber] = useState(''); // <-- මොබයිල් නම්බර් එක සඳහා අලුතින් එකතු කළා
  const [isSignUp, setIsSignUp] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (isSignUp) {
      // --- 1. SIGN UP (මොබයිල් නම්බර් එකත් එක්කම) ---
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // මෙතන user_metadata ඇතුළට තමයි අපි නම සහ ෆෝන් නම්බර් එක දෙන්නේ
          data: {
            full_name: fullName,
            mobile_number: mobileNumber, // <-- මෙතනින් Supabase එකට යනවා
          },
        },
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        alert('Account created successfully! Now you can sign in.');
        setIsSignUp(false); 
      }
    } else {
      // --- 2. SIGN IN ---
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        router.push('/');
        router.refresh();
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4 pt-20">
      <div className="bg-white p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-zinc-100 w-full max-w-[400px]">
        
        <h2 className="font-serif text-2xl font-bold text-center text-zinc-900 mb-2 tracking-wide">
          {isSignUp ? 'CREATE ACCOUNT' : 'WELCOME BACK'}
        </h2>
        <p className="text-xs text-center text-zinc-400 mb-6 uppercase tracking-widest font-medium">
          {isSignUp ? 'Join Dhara Collection' : 'Sign in to your luxury experience'}
        </p>

        {errorMsg && (
          <div className="bg-rose-50 text-rose-500 text-xs p-3 rounded-xl mb-4 font-medium border border-rose-100">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleAuth} className="flex flex-col gap-4">
          {/* Sign Up වලදී විතරක් පෙනෙන Fields */}
          {isSignUp && (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 tracking-wider uppercase">Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-50 border border-zinc-200 outline-none focus:border-[#C5A358] transition-colors"
                />
              </div>

              {/* Mobile Number Input Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 tracking-wider uppercase">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="0771234567"
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-50 border border-zinc-200 outline-none focus:border-[#C5A358] transition-colors"
                />
              </div>
            </>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-500 tracking-wider uppercase">Email Address</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-50 border border-zinc-200 outline-none focus:border-[#C5A358] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-500 tracking-wider uppercase">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-50 border border-zinc-200 outline-none focus:border-[#C5A358] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-zinc-950 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#C5A358] transition-all duration-300 disabled:bg-zinc-400 cursor-pointer"
          >
            {loading ? 'Processing...' : isSignUp ? 'Register Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(''); }}
            className="bg-transparent border-none text-xs text-[#C5A358] font-semibold hover:underline cursor-pointer"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>

      </div>
    </div>
  );
}