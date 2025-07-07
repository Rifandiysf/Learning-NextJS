import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginViews = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const { push, query } = useRouter()
    const callbackUrl: any = query.callbackUrl || '/'
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setError("")
        setIsLoading(true)
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: event.target.email.value,
                password: event.target.password.value,
                callbackUrl
            })
            if (!res?.error) {
                setIsLoading(false)
                push(callbackUrl)
            } else {
                setIsLoading(false)
                setError("Email or Password is incorrect")
            }
        } catch (error: any) {
            setIsLoading(false)
            setError("Email or Password is incorrect")
        }
    }
    return (
        <div
            style={{
                maxWidth: "400px",
                margin: "4rem auto",
                padding: "2rem",
                border: "1px solid #ccc",
                borderRadius: "0.5rem",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                fontFamily: "'Segoe UI', sans-serif",
            }}
        >
            <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                Login Page
            </h1>

            {error && <p style={{ color: "#fd3131", marginBottom: 10 }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        style={{
                            width: "100%",
                            padding: "0.5rem",
                            borderRadius: "0.375rem",
                            border: "1px solid #ccc",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        style={{
                            width: "100%",
                            padding: "0.5rem",
                            borderRadius: "0.375rem",
                            border: "1px solid #ccc",
                        }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "0.75rem",
                        backgroundColor: "#2563eb",
                        color: "white",
                        fontWeight: 600,
                        border: "none",
                        borderRadius: "0.375rem",
                        cursor: "pointer",
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Login"}
                </button>
            </form>
            <button
                type="submit"
                style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "#f0f4f9",
                    marginTop: 5,
                    color: "black",
                    fontWeight: 600,
                    border: "none",
                    borderRadius: "0.375rem",
                    cursor: "pointer",
                }}
                onClick={() => signIn("google", {
                    callbackUrl,
                    redirect: false
                })}
            >
                Sign In With Google
            </button>

            <p style={{ marginTop: "1rem", textAlign: "center" }}>
                Don't Have an account?{" "}
                <Link href="/auth/register" style={{ fontWeight: 800, color: "#2563eb" }}>
                    Sign Up
                </Link>
            </p>
        </div>
    );
};

export default LoginViews;
