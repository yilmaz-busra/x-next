"use client";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "@/atom/modelAtom";
import Modal from "react-modal";
import { HiX } from "react-icons/hi";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { app } from "@/firebase";
import {
  getFirestore,
  doc,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function CommentModel() {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [post, setPost] = useState({}); // [1
  const [input, setInput] = useState(""); // [2
  const { data: session } = useSession();
  const db = getFirestore(app);

  useEffect(() => {
    if (postId !== "") {
      const postRef = doc(db, "posts", postId);
      const unsubscribe = onSnapshot(postRef, (doc) => {
        if (doc.exists()) {
          setPost(doc.data());
        } else {
          console.log("No such document!");
        }
      });
      return () => unsubscribe();
    }
  }, [postId]);

  const sendComment = async () => {
    addDoc(doc(db, "posts", postId, "comments"), {
      name: session.user.name,
      image: session.user.image,
      text: input,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        setInput("");
        setOpen(false);
        router.push(`/post/${postId}`);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          ariaHideApp={false}
          className="max-w-lg w-[900%]  p-0  absolute top-24 left-[50%] translate-x-[-50%] border-2 border-gray-200 rounded-xl shadow-md bg-white "
        >
          <div className="p-4">
            <div className="border-b border-gray-200 py-2 px-1.5">
              <HiX
                onClick={() => setOpen(false)}
                className="p-1 text-2xl text-gray-700 hover:bg-gray-200 rounded-full cursor-pointer"
              />
            </div>
            <div className="flex items-center space-x-1 relative p-2">
              <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300" />
              <img
                src={post?.profileImage}
                alt="user-img"
                className="h-11 w-11 mr-4 rounded-full "
              />
              <h4 className="font-bold sm:text-[16px] text-[15px] hover:underline truncate ">
                {post?.name}
              </h4>
              <span className="text-sm sm:text-[15px] truncate">
                @{post?.username}
              </span>
            </div>
            <p className="sm:text-[16px] text-[15px] text-gray-700 ml-12">
              {post?.text}
            </p>
            <div className="flex p-3 space-x-3">
              <img
                src={session.user.image}
                alt="user-img"
                className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
              />
              <div className="w-full divide-y divide-y-gray-200">
                <div>
                  <textarea
                    className="w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700 placeholder:text-gray-500"
                    placeholder="Add a comment..."
                    rows="2"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex items-center justify-end pt-3">
                  <button
                    onClick={sendComment}
                    disabled={input.trim() === ""} //trim=> remove white space
                    className="px-4 py-1.5 rounded-full font-bold text-white shadow-md bg-blue-400 hover:brightness-95 disabled:opacity-50"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
