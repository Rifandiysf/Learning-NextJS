import Link from "next/link"
import { useRouter } from "next/router"
import styles from "./Login.module.css"

const LoginViews = () => {
    const { push } = useRouter()
    const handleLogin = () => {
        push("/product")
    }
    return (
        <div className={styles.login}>
            <h1>Login Page</h1>
            <button onClick={() => handleLogin()}>Login</button>
            <br />
            Dont Have Account? <Link href={"/auth/register"} style={{ fontWeight: 800 }}>Sign up</Link>
        </div>
    )
}

export default LoginViews