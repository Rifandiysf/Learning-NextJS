import Link from "next/link"
import { useState } from "react"

type ProductType = {
    id: string,
    name: string,
    image: string,
    price: number,
    size: string,
    category: string
}

const ProductViews = ({ products }: { products: ProductType[] }) => {
    const [product] = useState<ProductType[]>([])

    return (
        <div style={{ width: "100%", padding: 20 }}>
            <h1 style={{
                marginBottom: 20,
                textAlign: "center",
                fontSize: 32,
                fontWeight: "bold"
            }}>
                Product
            </h1>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: 24
            }}>
                {(products.length === 0 ? Array.from({ length: 3 }) : products).map((product: any, index) => {
                    const isLoading = !product || typeof product !== "object"

                    return (
                        <Link
                            href={isLoading ? "#" : `/product/${product.id}`}
                            key={isLoading ? index : product.id}
                            style={{
                                border: "1px solid #e0e0e0",
                                borderRadius: 8,
                                overflow: "hidden",
                                backgroundColor: "#fff",
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
                            }}
                        >
                            <div style={{
                                width: "100%",
                                aspectRatio: "1 / 1",
                                backgroundColor: isLoading ? "#e0e0e0" : "transparent"
                            }}>
                                {!isLoading && (
                                    <img src={product.image} alt={product.name}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                )}
                            </div>

                            <div style={{
                                padding: 16,
                                display: "flex",
                                flexDirection: "column",
                                gap: 6
                            }}>
                                {!isLoading ? (
                                    <>
                                        <h4 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{product.name}</h4>
                                        <p style={{ fontSize: 14, color: "#777", margin: 0 }}>{product.category}</p>
                                        <p style={{ fontSize: 14, color: "#777", margin: 0 }}>Size: {product.size}</p>
                                        <p style={{
                                            fontSize: 16,
                                            color: "red",
                                            fontWeight: "bold",
                                            margin: "8px 0 0"
                                        }}>
                                            Rp.{product.price.toLocaleString('id-ID')}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <div style={{ height: 16, width: "80%", backgroundColor: "#e0e0e0", borderRadius: 4 }} />
                                        <div style={{ height: 12, width: "50%", backgroundColor: "#e0e0e0", borderRadius: 4 }} />
                                        <div style={{ height: 12, width: "40%", backgroundColor: "#e0e0e0", borderRadius: 4 }} />
                                        <div style={{ height: 16, width: "60%", backgroundColor: "#d6d6d6", borderRadius: 4 }} />
                                    </>
                                )}
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductViews
