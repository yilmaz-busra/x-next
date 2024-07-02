"use client";
import {
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineTrash,
  HiHeart,
} from "react-icons/hi";
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { signIn, useSession } from "next-auth/react";
import { app } from "../firebase";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "@/atom/modelAtom";

function Icons({ id, uid }) {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const db = getFirestore(app);
  const likePost = async () => {
    if (session) {
      if (isLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
          username: session.user.username,
          Timestamp: serverTimestamp(),
        });
      }
    } else {
      signIn();
    }
  };

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db]);

  useEffect(() => {
    setIsLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1);
  }, [likes]);

  const deletePost = async () => {
    if (session?.user.uid === uid) {
      if (window.confirm("Are you sure you want to delete this post?")) {
        await deleteDoc(doc(db, "posts", id))
          .then(() => {
            console.log("Document successfully deleted!");
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error removing document: ", error);
          });
      }
    } else {
      alert("You are not authorized to delete this post");
    }
  };
  return (
    <div className="flex justify-start gap-5 p-2 text-gray-500">
      <HiOutlineChat
        onClick={() => {
          if (!session) {
            signIn();
          } else {
            setOpen(!open);
            setPostId(id);
          }
        }}
        className="h-8 w-8 p-2 cursor-pointer rounded-full transition duration-500 ease-in-out hover:text-sky-500 hover:bg-sky-100"
      />
      <div className="flex items-center">
        {isLiked ? (
          <HiHeart
            onClick={likePost}
            className="h-8 w-8 p-2 cursor-pointer rounded-full transition duration-500 ease-in-out text-red-300 hover:text-red-500 hover:bg-red-100"
          />
        ) : (
          <HiOutlineHeart
            onClick={likePost}
            className="h-8 w-8 p-2 cursor-pointer rounded-full transition duration-500 ease-in-out  hover:text-red-500 hover:bg-red-100"
          />
        )}
        {likes.length > 0 && (
          <span className={`text-xs ${isLiked && "text-red-600"}`}>
            {likes.length}
          </span>
        )}
      </div>

      {session?.user.uid === uid && (
        <HiOutlineTrash
          onClick={deletePost}
          className="h-8 w-8 p-2 cursor-pointer rounded-full transition duration-500 ease-in-out hover:text-red-500 hover:bg-red-100"
        />
      )}
    </div>
  );
}

export default Icons;
