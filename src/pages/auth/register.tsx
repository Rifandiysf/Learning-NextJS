import Link from "next/link"

const RegisterPage = () => {
    return (
        <div>
            <h1>Register Page</h1>
            Have Account <Link href={"/auth/login"} style={{fontWeight: 800}}>Sign In</Link>
        </div>
    )
}

export default RegisterPage