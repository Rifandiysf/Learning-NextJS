
const CustomNotFound = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh",  }}>
            <img src={"/404.svg"} alt={"404"} style={{ width: "20rem", marginBottom: "20px" }}/>
            <h1 style={{ fontSize: "36px", color: "#6c63ff" }}>Page Not Found</h1>
        </div>
    )
}

export default CustomNotFound