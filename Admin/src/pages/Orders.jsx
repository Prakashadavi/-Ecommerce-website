import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backedUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backedUrl + '/api/order/list',
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backedUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      )

      if (response.data.success) {
        fetchAllOrders()
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div>
      <h3>Order Page</h3>

      <div>
        {orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
          >
            <img src={assets.parcel_icon} alt="" />

            <div>
              {order.items.map((item) => (
                <p key={item._id} className="py-0.5">
                  {item.name} x {item.quantity}
                  <span> {item.size}</span>
                </p>
              ))}

              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>

              <p>{order.address.street},</p>
              <p>
                {order.address.city}, {order.address.state},{" "}
                {order.address.country}, {order.address.zipcode}
              </p>
              <p>{order.address.phone}</p>
            </div>

            <div>
              <p>Items : {order.items.length}</p>
              <p className="mt-3">Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? "Done" : "Pending"}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <p className="font-medium">
              {currency}{order.amount}
            </p>

            <select
              value={order.status}
              onChange={(event) => statusHandler(event, order._id)}
              className="p-2 font-semibold border"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
