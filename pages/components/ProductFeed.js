import React, { Component } from "react";
import Product from "./Product";
import dynamic from "next/dynamic";

function ProductFeed({ items }) {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-32 mx-auto">
      {items
        .slice(0, 4)
        .map(({ id, title, price, description, category, image }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}
      <img
        src="https://links.papareact.com/dyz"
        alt="banner"
        className="md:col-span-full rounded-md"
      />
      <div className="md:col-span-2 ">
        {items
          .slice(4, 5)
          .map(({ id, title, price, description, category, image }) => (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
            />
          ))}
      </div>

      {items
        .slice(5, items.length)
        .map(({ id, title, price, description, category, image }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}
    </div>
  );
}

export default dynamic(() => Promise.resolve(ProductFeed), { ssr: false });
