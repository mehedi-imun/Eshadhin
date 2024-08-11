/* eslint-disable @typescript-eslint/no-explicit-any */
import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";

import { useAppDispatch } from "../redux/hooks";
import { updateQuantity } from "../redux/features/cartSlice";

const CartDetails = ({ product }: any) => {
const dispatch = useAppDispatch()
  const handleQuantity =(type:string,id:string)=>{
    const payload = {type,id}
    dispatch(updateQuantity(payload))
  }
  return (
    <div className="flex items-center justify-between space-x-4 border border-gray-300 rounded-lg p-4 bg-white shadow-md transition-transform transform hover:scale-105 hover:shadow-lg w-full max-w-md mx-auto">
      <img
        src={product.image}
        alt={product.name}
        className="w-24 h-24 object-cover rounded-md"
      />
      <div className="flex-grow mx-4">
        <h3 className="text-lg font-semibold text-green-700 truncate mb-2">{product.name}</h3>
        <p className="text-lg font-bold text-red-600">${product.price}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantity("decrement", product.id)}
          className="bg-green-700 text-white p-2 rounded-full hover:bg-green-800"
        >
          <Minus size={18} />
        </button>
        <span className="text-lg font-semibold">{product.quantity}</span>
        <button
          onClick={() => handleQuantity("increment", product.id)}
          className="bg-green-700 text-white p-2 rounded-full hover:bg-green-800"
        >
          <Plus size={18} />
        </button>
      </div>
      <button
        // onClick={(e) => handleRemove(e, product.id)}
        className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default CartDetails;
