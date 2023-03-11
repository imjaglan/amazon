import React from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";
function CheckoutProduct({
  id,
  title,
  rating,
  price,
  description,
  category,
  image,
  hasPrime,
}) {
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      hasPrime,
      rating,
      description,
      category,
      image,
    };
    //sending the product as an action to the store
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    //remove an item from redux
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} className="object-contain" />

      {/* middle desc section */}
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500 " />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <div>${price}</div>

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              src="https://links.papareact.com/fdw"
              className="w-12"
            />
            <p className="text-xs text-gray-500">FREE Next-Day Delivery</p>
          </div>
        )}
      </div>

      {/* buttons */}
      <div className="flex flex-col space-y-2 my-auto  justify-self-end">
        <button className="button" onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button onClick={removeItemFromBasket} className="button">
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
