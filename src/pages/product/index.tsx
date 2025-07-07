import ProductViews from "@/components/views/product"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const ProductPage = () => {
    const [products, setProducts] = useState([])
    const { push } = useRouter()

    useEffect(() => {
        fetch("/api/product").then((res) => res.json().then((response) => {
            setProducts(response.data)
        }))
    }, [])

    return (
        <>
            <ProductViews products={products}/>
        </>
    )
}

export default ProductPage