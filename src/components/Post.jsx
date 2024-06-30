import Link from "next/link";
import { HiDotsHorizontal } from "react-icons/hi";
import Icons from "./Icons";

export default function Post({ post, id }) {
  return (
    <div className="flex p-3 border-b border-gray-20 hover:bg-gray-50">
      <img
        src={post?.profileImage}
        alt="user-img"
        className="h-11 w-11 rounded-full mr-4 "
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-sm truncate ">{post?.name}</h4>
            <span className="text-sx truncate">@{post?.username}</span>
          </div>
          <HiDotsHorizontal className="text-sm" />
        </div>
        <Link href={`/posts/${id}`}>
          <p className="text-sm my-3 text-gray-900">{post?.text}</p>
        </Link>
        <Link href={`/posts/${id}`}>
          <img src={post?.image} className="rounded-2xl mr-2" />
        </Link>
        <Icons id={id} />
      </div>
    </div>
  );
}
