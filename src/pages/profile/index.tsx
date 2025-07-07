import { useSession } from "next-auth/react";


const index = () => {
    const { data: session }: any = useSession();
    return (
        <>
            <div>Profile Page</div>
            {session?.user?.fullname && (
                <span>{session.user.fullname}</span>
            )}
        </>
    )
}

export default index