import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backedUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backedUrl + '/api/product/list')

      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  // SAME CODE AS IMAGE (remove product)

const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backedUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  // ✅ useEffect MUST be here
  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className='mb-2'>All Products List</p>

      <div className='flex flex-col gap-2'>

        {/* ------- List Table Title -------- */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* ------- Product List -------- */}
        {
          list.map((item) => (
            <div
              key={item._id}
              className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border'
            >
              <img className='w-12' src={item.image[0]} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p  onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List
