"use client";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "@/atom/modelAtom";

export default function CommentModel() {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  return (
    <div>
      <h1>Comment Model</h1>
      {open && <h1>{postId} </h1>}
    </div>
  );
}
