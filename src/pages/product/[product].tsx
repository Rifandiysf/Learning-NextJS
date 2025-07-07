import DetailProduct from "@/components/views/detail"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

type ProductType = {
    id: string,
    name: string,
    image: string,
    price: number,
    size: string,
    category: string
}

const DetailProductPage = (/*{ product }: { product: ProductType }*/) => {
    const { query } = useRouter()
    // Client Side Rendering
    const [product, setProduct] = useState<ProductType | null>(null)


    useEffect(() => {
        fetch(`/api/product/${query.product}`).then((res) => res.json().then((response) => {
            setProduct(response.data)
        }))
    }, [query.product])
    return (
        <>
            {/* Client Side Rendering */}
            <h1 style={{ textAlign: "center" }}>Detail Product Page</h1>
            {product ? (
                <DetailProduct product={product} />
            ) : (
                <p style={{ textAlign: "center" }}>Loading product...</p>
            )}

            {/* Server Side Rendering */}
            {/* <h1 style={{ textAlign: "center" }}>Detail Product Page</h1>
            {product ? (
                <DetailProduct product={product} />
            ) : (
                <p style={{ textAlign: "center" }}>Loading product...</p>
            )} */}

            {/* Static Side Generation */}
            {/* <h1 style={{ textAlign: "center" }}>Detail Product Page</h1>
            {product ? (
                <DetailProduct product={product} />
            ) : (
                <p style={{ textAlign: "center" }}>Loading product...</p>
            )} */}
        </>
    )
}

export default DetailProductPage

// Server Side Rendering
// export async function getServerSideProps({ params, }: { params: { product: string } }) {
//     const res = await fetch(`http://localhost:3000/api/product/${params.product}`)
//     const response = await res.json()
//     return {
//         props: {
//             product: response.data
//         }
//     }
// }

// Static Side Generation
// export async function getStaticPaths() {
//     const res = await fetch("http://localhost:3000/api/product/")
//     const response = await res.json()
//     const paths = response.data.map((product: ProductType) => ({
//         params: {
//             product: product.id
//         }
//     }))
//     return {paths, fallback: false}
// }

// export async function getStaticProps({ params, }: { params: { product: string } }) {
//     const res = await fetch(`http://localhost:3000/api/product/${params.product}`)
//     const response = await res.json()
//     return {
//         props: {
//             product: response.data
//         }
//     }
// }
