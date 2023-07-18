import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout/index";
import OrdersCard from "../../Components/OrdersCard";
import { ShoppingCartContext } from "../../Context";

function MyOrders() {
  const context = useContext(ShoppingCartContext);

  return (
    <Layout className="bg-red-100">
      <div className="flex items-center justify-center relative w-80 mb-4">
        <h1 className="font-medium text-xl">MyOrders</h1>
      </div>

      {context.order.map((order, index) => (
        <Link key={index} to={`/MyOrders/${index}`}>
          <OrdersCard
            totalPrice={order.totalPrice}
            totalProducts={order.totalProducts}
          />
        </Link>
      ))}
    </Layout>
  );
}

export default MyOrders;
