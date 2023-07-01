import { Product } from "../models";

export interface CardProductProps {
  product: Product;
}

export default function CardProduct({ product }: CardProductProps) {
  return (
    <div className="product p-4 border border-gray-600 rounded-md">
      <div className="flex flex-col gap-2.5">
        <img
          src={product.images[0]}
          className="object-contain  h-[300px] w-full"
        />
        <div className="p-2.5">
          <p className="font-bold text-lg">{product.title}</p>
          <p className=" text-lg">Brand: {product.brand}</p>

          <p className="text-md flex flex-row gap-2">
            <span>Price: </span>
            <span className="italic line-through">{product.price}$</span>
            <span className="italic text-blue-500 font-bold">
              {(
                (product.price * (100 - product.discountPercentage)) /
                100
              ).toFixed(2)}
              $
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
