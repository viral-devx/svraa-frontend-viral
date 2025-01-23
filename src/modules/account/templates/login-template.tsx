"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
  REQUEST_OTP = "request-otp",
  VERIFY_OTP = "verify-otp",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("request-otp")
  const [phone, setPhone] = useState()

  return (
    <div className="w-full flex justify-start px-8 py-8">
      {currentView === "verify-otp" ? (
        <Login phone={phone} setCurrentView={setCurrentView} />
      ) : (
        <Register setCurrentView={setCurrentView} setPhone={setPhone} />
      )}
    </div>
  )
}

export default LoginTemplate
