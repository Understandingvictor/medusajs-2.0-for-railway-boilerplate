"use client"

import { useState } from "react"
import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-stretch bg-white overflow-hidden">
      
      {/* SECTION 1: EDITORIAL (Left) */}
      <div className="flex-1 flex flex-col justify-center lg:justify-between p-8 md:p-12 xl:p-20 bg-[#fcfcfc] border-b lg:border-b-0 lg:border-r border-gray-100">
        
        {/* Empty div to maintain spacing on desktop since we removed the header */}
        <div className="hidden lg:block"></div>
        
        <div className="py-8 lg:py-0">
          {/* Mobile: text-4xl | Desktop: fluid scaling up to 8rem */}
          <h1 className="text-4xl sm:text-5xl lg:text-[clamp(3.5rem,7vw,8rem)] font-black italic uppercase tracking-tighter leading-[0.8] text-[#800020]">
            {currentView === "sign-in" ? (
              <>Welcome <br className="hidden sm:block" /> Back</>
            ) : (
              <>The <br className="hidden sm:block" /> Archive</>
            )}
          </h1>
          
          <div className="mt-4 lg:mt-8 max-w-[260px] lg:max-w-[300px]">
            <p className="text-gray-400 text-[9px] lg:text-[10px] uppercase tracking-[0.2em] font-bold leading-relaxed">
              Access your personal wardrobe and exclusive member benefits.
            </p>
            <div className="h-1 w-12 bg-[#800020] mt-4 lg:mt-6"></div>
          </div>
        </div>

        <div className="hidden lg:block">
          <span className="text-[10px] uppercase tracking-widest text-gray-300 font-bold">
            Ref. No. 2026-KC
          </span>
        </div>
      </div>

      {/* SECTION 2: FORM (Right) */}
      <div className="flex-1 flex flex-col justify-start lg:justify-center items-center p-8 lg:p-20 bg-white">
        {/* -mt-12 on mobile to pull the form up closer to the branding */}
        <div className="w-full max-w-[360px] -mt-8 lg:mt-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Subtle Mobile Form Title */}
          <div className="mb-6 lg:hidden text-center">
             <h2 className="text-xl font-black italic uppercase tracking-tighter text-[#800020]">
              {currentView === "sign-in" ? "Sign In" : "Register"}
            </h2>
          </div>

          <div className="relative">
            {currentView === "sign-in" ? (
              <Login setCurrentView={setCurrentView} />
            ) : (
              <Register setCurrentView={setCurrentView} />
            )}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default LoginTemplate