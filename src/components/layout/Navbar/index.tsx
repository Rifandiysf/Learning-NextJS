import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const { data: session }: any = useSession();

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem 2rem",
                backgroundColor: "#000000",
                color: "#f1f5f9",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                fontFamily: "'Segoe UI', sans-serif",
            }}
        >
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>MyApp</div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {session?.user?.fullname && session?.user?.image &&(
                    <div style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center"}}>
                        <img 
                        style={{
                            width: 40,
                            borderRadius: "100%"
                        }} 
                        src={session.user.image} alt={session.user.fullname} />
                        <span>{session.user.fullname}</span>
                    </div>
                )}

                {session ? (
                    <button
                        onClick={() => signOut()}
                        style={{
                            padding: "0.5rem 1rem",
                            backgroundColor: "#2563eb",
                            color: "white",
                            border: "none",
                            borderRadius: "0.375rem",
                            cursor: "pointer",
                            fontWeight: 500,
                            transition: "background-color 0.2s ease",
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = "#1d4ed8";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = "#2563eb";
                        }}
                    >
                        Sign Out
                    </button>
                ) : (
                    <button
                        onClick={() => signIn()}
                        style={{
                            padding: "0.5rem 1rem",
                            backgroundColor: "#2563eb",
                            color: "white",
                            border: "none",
                            borderRadius: "0.375rem",
                            cursor: "pointer",
                            fontWeight: 500,
                            transition: "background-color 0.2s ease",
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = "#1d4ed8";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = "#2563eb";
                        }}
                    >
                        Sign In
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
