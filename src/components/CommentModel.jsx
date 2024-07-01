"use client";
import { useRecoilState } from "recoil";
import { modalState } from "@/atom/modelAtom";

export default function CommentModel() {
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <div>
      <h1>Comment Model</h1>
      {open && <h1>The modal is open </h1>}
    </div>
  );
}
