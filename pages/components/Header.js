import React, { Component } from "react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../../slices/basketSlice";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useSelector(selectItems); //selector is used to grab anything from the store

  return (
    <header>
      {/* top nav */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-1">
        <div className="mt-3 mx-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            priority
            alt="amazon"
            width={150}
            height={40}
            objectFit="contain"
            className=" cursor-pointer "
          />
        </div>
        {/* Search bar */}
        <div className="hidden sm:flex items-center h-10 rounded-md  bg-yellow-400 hover:bg-yellow-500 flex-grow cursor-pointer">
          <input
            type="text"
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
          />
          <SearchIcon className="h-12 p-4 " />
        </div>
        {/* right side of the bar */}

        <div className="text-white flex items-center text-s space-x-6 mx-6 whitespace-nowrap">
          <div onClick={!session ? signIn : signOut} className=" link">
            <p>{session ? `Hello , ${session.user.name}` : "Sign In"}</p>
            <p className="fonrt-extrabold  md:text-sm">Account & Lists</p>
          </div>

          <div className=" link">
            <p>Returns</p>
            <p className="fonrt-extrabold md:text-sm">&Orders</p>
          </div>

          <div
            onClick={() => router.push("/checkout")}
            className=" relative link flex items-center"
          >
            <span className=" absolute top-0 right-0 text-xs md:right-10 h-4 w-4 bg-yellow-400  text-center rounded-full text-black font-bold ">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className=" hidden fonrt-extrabold md:text-sm md:inline ">
              Basket
            </p>
          </div>
        </div>
      </div>
      {/* bottom nav */}
      <div className="flex items-center justify-evenly space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-s">
        <div className="link  flex">
          <MenuIcon className="h-6 mr-1" />
          All
        </div>
        <p className="link"> Prime Videos</p>
        <p className="link"> Amazon Buisness</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocry</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Health & Personal</p>
        <p className="link hidden lg:inline-flex">Fashion</p>
      </div>
    </header>
  );
}

export default Header;
