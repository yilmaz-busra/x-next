"use client";
import { useSession } from "next-auth/react";
import { HiOutlinePhotograph } from "react-icons/hi";

export default function Input() {
  const { data: session } = useSession();
  if (!session) return null;

  return (
    <div className="w-full flex border-b border-gray-200 p-3 space-x-3">
      <img
        src={session.user.image}
        alt="user-img"
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
      />
      <div className="w-full  divide-y divide-gray-200">
        <textarea
          className="w-full border-none outline-none tracking-wide min-h-[50px] text-gray-200"
          placeholder="Whats happening"
          rows="2"
        ></textarea>
        <div className="flex items-center justify-betweenpt-2.5 ">
          <HiOutlinePhotograph className="h-10 w-10 p-2 text-sky-500 hover:gb-sky-100 rounded-full cursor-pointer" />
          <button
            disabled
            className="px-4 py-1.5 rounded-full  shadow-md hover:brightness-95 disabled:opacity-50 font-bold bg-blue-400 text-white"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
