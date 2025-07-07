type ProductType = {
    id: string,
    name: string,
    image: string,
    price: number,
    size: string,
    category: string
}

const DetailProduct = ({ product }: { product: ProductType }) => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            gap: 40,
            padding: 40,
            maxWidth: 1000,
            margin: "auto",
            flexWrap: "wrap",
        }}>
            {/* Left Side: Image */}
            <div style={{ flex: 1, minWidth: 300 }}>
                <div style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    backgroundColor: product?.image ? "transparent" : "#e0e0e0"
                }}>
                    {product?.image && (
                        <img src={product.image} alt={product.name}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: 8
                            }} />
                    )}
                </div>
            </div>

            <div style={{ flex: 1, minWidth: 300, display: "flex", flexDirection: "column", gap: 16 }}>
                <h2 style={{ fontSize: 22, fontWeight: "bold", margin: 0 }}>{product.name}</h2>

                <div>
                    <p style={{
                        fontSize: 20,
                        color: "red",
                        fontWeight: "bold",
                        margin: 0
                    }}>
                        Rp.{product.price.toLocaleString('id-ID')}
                    </p>
                    <p style={{
                        fontSize: 14,
                        color: "#999",
                        textDecoration: "line-through",
                        marginTop: 4
                    }}>
                        Rp.{(product.price + 50000).toLocaleString('id-ID')}
                    </p>
                </div>

                <div>
                    <p style={{ marginBottom: 8, fontSize: 14 }}>Size</p>
                    <div style={{ display: "flex", gap: 8 }}>
                        {["M", "L", "XL", "XXL"].map((size) => (
                            <button
                                key={size}
                                style={{
                                    padding: "8px 16px",
                                    border: size === product.size ? "2px solid black" : "1px solid #ccc",
                                    backgroundColor: size === product.size ? "#000" : "#fff",
                                    color: size === product.size ? "#fff" : "#000",
                                    borderRadius: 4,
                                    cursor: "pointer"
                                }}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                    <button style={{
                        width: 40,
                        height: 40,
                        fontSize: 20,
                        border: "1px solid #ccc",
                        backgroundColor: "#fff",
                        cursor: "pointer"
                    }}>-</button>

                    <input
                        type="text"
                        value="1"
                        readOnly
                        style={{
                            width: 40,
                            height: 40,
                            textAlign: "center",
                            border: "1px solid #ccc"
                        }}
                    />

                    <button style={{
                        width: 40,
                        height: 40,
                        fontSize: 20,
                        border: "1px solid #ccc",
                        backgroundColor: "#fff",
                        cursor: "pointer"
                    }}>+</button>

                    <button style={{
                        flex: 1,
                        backgroundColor: "#000",
                        color: "#fff",
                        border: "none",
                        padding: "0 16px",
                        borderRadius: 4,
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}>
                        ADD TO CART
                    </button>
                </div>

                <div>
                    <details>
                        <summary style={{ fontWeight: "bold", fontSize: 14 }}>DESCRIPTION</summary>
                        <p style={{ fontSize: 14, marginTop: 8 }}>Material: Premium Nylon</p>
                    </details>

                    <details style={{ marginTop: 12 }}>
                        <summary style={{ fontWeight: "bold", fontSize: 14 }}>SHIPPING & RETURNS</summary>
                        <p style={{ fontSize: 14, marginTop: 8 }}>
                            Produk dikirim 1–2 hari kerja setelah pembayaran. Bisa diretur dalam 7 hari.
                        </p>
                    </details>
                </div>
            </div>
        </div>
    )
}

export default DetailProduct
