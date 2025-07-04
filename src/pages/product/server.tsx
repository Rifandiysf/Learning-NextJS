import ProductViews from "@/components/views/product"

type ProductType = {
    id: string,
    name: string,
    image: string,
    price: number,
    size: string,
    category: string
}

const ProductPage = (props: { products: ProductType[] }) => {
    const { products } = props
    return (
        <div>
            <ProductViews products={products}/>
        </div>
    )
}

export default ProductPage

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/api/product')
    const response = await res.json()
    return {
        props: {
            products: response.data
        }
    }
}