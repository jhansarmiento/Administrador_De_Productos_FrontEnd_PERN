import { Product } from "../types";

type ProductFormProps = {
    productById?: Product
}


export default function ProductForm({ productById }: ProductFormProps) {
  return (
    <>
      <div className="mb-4">
        <label htmlFor="name" className="text-gray-800">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="mt-2 block w-full p-3 bg-gray-50 rounded-xl"
          placeholder="Product Name"
          defaultValue={productById?.name}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="text-gray-800">
          Product Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          className="mt-2 block w-full p-3 bg-gray-50 rounded-xl"
          placeholder="Product Price. e.g 199, 300"
          defaultValue={productById?.price}
        />
      </div>
    </>
  );
}
