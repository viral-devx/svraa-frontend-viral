import { login } from "@lib/data/customer"
import { Input } from "@medusajs/ui"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { BaseSyntheticEvent, useActionState, useRef, useState } from "react"

const length: number = 6

const Login = ({
  phone,
  setCurrentView,
}: {
  phone: string
  setCurrentView: (view: string) => void
}) => {
  const [message, formAction] = useActionState(login, null)

  const [otp, setOtp] = useState(new Array(length).fill(""))
  const formRef = useRef<HTMLFormElement | undefined>(undefined)

  const handleChange = (value: number, index: number) => {
    if (!/^\d*$/.test(String(value))) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < length - 1) {
      document.getElementById(`otp-input-${index + 1}`)?.focus()
    }
  }

  const handleKeyDown = (event: BaseSyntheticEvent, index: number) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`)?.focus()
    }
  }

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center"
      data-testid="login-page"
    >
      <h1 className="text-large-semi uppercase mb-6">Welcome back</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        Sign in to access an enhanced shopping experience.
      </p>
      <form ref={formRef} className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Phone"
            name="phone"
            type="text"
            required
            data-testid="password-input"
            value={phone}
          />
          <Input
            label="otp"
            name="otp"
            type="text"
            required
            data-testid="otp-input"
            value={otp.join("")}
            className="hidden"
          />
          <div className="flex w-full justify-between gap-x-2">
            {/* <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          /> */}
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e: BaseSyntheticEvent) =>
                  handleChange(e.target.value, index)
                }
                onKeyDown={(e: BaseSyntheticEvent) => handleKeyDown(e, index)}
                style={{
                  width: "40px",
                  height: "40px",
                  textAlign: "center",
                  fontSize: "18px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
                autoFocus={index === 0 ? true : false}
              />
            ))}
          </div>
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        {message && message.length ? (
          <div
            onClick={() => setCurrentView(LOGIN_VIEW.REQUEST_OTP)}
            className="pt-2 text-rose-500 text-small-regular"
          >
            Request OTP
          </div>
        ) : (
          ""
        )}
        <SubmitButton data-testid="sign-in-button" className="w-full mt-6">
          Submit
        </SubmitButton>
      </form>
      {/* <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Not a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
          data-testid="register-button"
        >
          Join us
        </button>
        .
      </span> */}
    </div>
  )
}

export default Login
