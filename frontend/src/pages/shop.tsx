// import { Banner, Footer, Header, ProductList } from "@/components"
import axios from "axios"
import Banner from "./(website)/home/_component/Banner"
import Catergories from "./(website)/product/_components/CategoryList"
import ProductList from "./(website)/product/_components/ProductList"
import { useQuery } from "@tanstack/react-query"


const ShopPage = () => {

    return (
        <div>
            < Banner />
            <Catergories />
            <hr />
            <ProductList />
            {/* <Footer /> */}
        </div>
    )
}

export default ShopPage