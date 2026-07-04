import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import etFavicon from "@/assets/ET_Fevicon.png";

export function AuthPage({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<"main" | "otp">("main");
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={etFavicon} alt="ErrorTrack icon" className="w-16 h-16 object-contain mx-auto mb-3" />
          <div className="font-display font-black text-2xl leading-none tracking-tight mb-2">
            <span style={{ color: "#0f1f5c" }}>ERROR</span><span style={{ color: "#00c49a" }}>Track</span>
          </div>
          <p className="text-gray-500 text-sm">Your complete NEET Biology prep platform</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 p-8 border border-gray-100">
          {mode === "main" ? (
            <>
              <h2 className="text-lg font-bold text-gray-900 mb-6 font-display">Sign in to continue</h2>

              <button
                onClick={onLogin}
                className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 hover:bg-gray-50 transition text-sm font-medium text-gray-700 mb-4"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-gray-400">or sign in with email</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent transition"
                />
                <button
                  onClick={() => email && setMode("otp")}
                  className="w-full bg-teal-500 text-white rounded-xl py-3 text-sm font-semibold hover:bg-teal-600 transition"
                >
                  Send OTP
                </button>
              </div>

              <p className="text-center text-[11px] text-gray-400 mt-5">
                By continuing, you agree to our Terms of Service
              </p>
            </>
          ) : (
            <>
              <button
                onClick={() => setMode("main")}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-5 transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <h2 className="text-lg font-bold text-gray-900 mb-1 font-display">Check your email</h2>
              <p className="text-sm text-gray-500 mb-6">
                We sent a 6-digit code to{" "}
                <span className="font-semibold text-gray-800">{email}</span>
              </p>
              <input
                type="text"
                placeholder="000000"
                maxLength={6}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent transition mb-4"
              />
              <button
                onClick={onLogin}
                className="w-full bg-teal-500 text-white rounded-xl py-3 text-sm font-semibold hover:bg-teal-600 transition"
              >
                Verify & Sign In
              </button>
              <button className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700 transition">
                Resend code
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
