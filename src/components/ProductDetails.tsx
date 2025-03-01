import { Form, useNavigate, ActionFunctionArgs,redirect, useFetcher } from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id)
    return redirect('/')
  }
}

export default function ProductDetails({ product }: ProductDetailsProps) {

  const fetcher = useFetcher()
  const navigate = useNavigate()
  const isAvailable = product.availability;

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">
        {product.name}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center">
        <fetcher.Form 
          method="POST">
            <button
             type="submit"
             name="id"
             value={product.id}
             className={`${isAvailable ? 'text-black' : 'text-red-400'} border border-black-100 w-full p-2 rounded-xl uppercase text-xs font-bold hover:cursor-pointer`}
              
            >
              {isAvailable ? 'Available' : 'Unavailable'}
            </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800">
        <div className="flex gap-2 items-center">
            <button 
              onClick={() => navigate(`/products/${product.id}/edit`, {
                state: {
                  product
                }
              })}
              className="bg-indigo-600 text-white p-2 font-bold uppercase text-xs w-full rounded-xl text-center hover:bg-indigo-500 hover:cursor-pointer"
            >Edit</button>
            <Form 
              className="w-full"
              method="POST"
              action={`/products/${product.id}/delete`}
              onSubmit={(e) => {
                if(!confirm('Are you sure you want to delete this product?')){
                  e.preventDefault()
                }
              }}
            >
                <input 
                  type="submit" 
                  className="bg-red-400 text-white p-2 font-bold uppercase text-xs w-full rounded-xl text-center hover:bg-red-500 hover:cursor-pointer"
                  value="Delete"
                />
            </Form>
        </div>
      </td>
    </tr>
  );
}
