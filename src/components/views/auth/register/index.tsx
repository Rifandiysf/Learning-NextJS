import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const RegisterViews = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const { push } = useRouter()
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setError("")
        setIsLoading(true)
        const data = {
            email: event.target.email.value,
            fullname: event.target.fullname.value,
            password: event.target.password.value,
        }
        const result = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify(data)
        })
        if (result.status === 200) {
            event.target.reset()
            setIsLoading(false)
            push("/auth/login")
        } else {
            setIsLoading(false)
            setError(result.status === 400 ? "Email already exists" : "")
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
                Register Page
            </h1>

            {error && <p style={{ color: "#fd3131", marginBottom: 10 }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="fullname"
                        placeholder="Enter your full name"
                        style={{
                            width: "100%",
                            padding: "0.5rem",
                            borderRadius: "0.375rem",
                            border: "1px solid #ccc",
                        }}
                    />
                </div>

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
                    {isLoading ? "Loading..." : "Register"}
                </button>
            </form>

            <p style={{ marginTop: "1rem", textAlign: "center" }}>
                Have an account?{" "}
                <Link href="/auth/login" style={{ fontWeight: 800, color: "#2563eb" }}>
                    Sign In
                </Link>
            </p>
        </div>
    );
};

export default RegisterViews;
