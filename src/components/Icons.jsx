"use client";

import { HiOutlineChat, HiOutlineHeart, HiOutlineTrash } from "react-icons/hi";

function Icons() {
  return (
    <div className="flex justify-start gap-5 p-2 text-gray-500">
      <HiOutlineChat className="h-8 w-8 p-2 cursor-pointer rounded-full transition duration-500 ease-in-out hover:text-sky-500 hover:bg-sky-100" />
      <HiOutlineHeart className="h-8 w-8 p-2 cursor-pointer rounded-full transition duration-500 ease-in-out hover:text-red-500 hover:bg-red-100" />
      <HiOutlineTrash className="h-8 w-8 p-2 cursor-pointer rounded-full transition duration-500 ease-in-out hover:text-red-500 hover:bg-red-100" />
    </div>
  );
}

export default Icons;
