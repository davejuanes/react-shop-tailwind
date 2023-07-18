import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import React from "react"
import Layout from "../../Components/Layout/index"
import OrderCard from '../../Components/OrderCard'
import { ChevronLeftIcon } from "@heroicons/react/24/solid"
import { Link } from 'react-router-dom'

function MyOrder() {
  const context = useContext(ShoppingCartContext)
  const currentPath = window.location.pathname
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1)
  if(index === 'last') {
    index = (context.order?.length -1)
  }

  return (
    <Layout className="bg-red-100">
        <div className="flex items-center justify-center relative w-80 mb-6">
          <Link to='/MyOrders' className="absolute left-0">
            <ChevronLeftIcon className="h-6 w-6 text-black cursor-pointer" />
          </Link>
          <h1>MyOrder</h1>
        </div>
      <div className='flex flex-col w-80'>
        {
            context.order?.[index]?.products.map(product => (
                <OrderCard
                    id={product.id}
                    key={product.id} 
                    title={product.title}
                    imageUrl={product.images?.[0]}
                    price={product.price}
                />
            ))
        }
      </div>
    </Layout>
  )
}

export default MyOrder;
