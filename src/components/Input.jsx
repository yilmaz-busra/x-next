"use client";
import { app } from "@/firebase";
import { useSession } from "next-auth/react";
import { staticGenerationAsyncStorage } from "next/dist/client/components/static-generation-async-storage-instance";
import { useEffect, useRef, useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
export default function Input() {
  const imagePicRef = useRef(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [text, setText] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const db = getFirestore(app);
  const addImageToPost = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
      console.log(file);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  const uploadImageToStorage = () => {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectedFile.name;
    const storageRef = ref(storage, `posts/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      (error) => {
        console.log(error);
        setImageFileUploading(false);
        setImageFileUrl(null);
        setSelectedFile(null);
      };
      setImageFileUploading(false);
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
        });
      };
    });
  };

  const handleSubmit = async () => {
    setPostLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      uid: session.user.uid,
      name: session.user.name,
      username: session.user.username,
      text,
      profileImage: session.user.image,
      timestamp: serverTimestamp(),
      image: imageFileUrl,
    });
    setPostLoading(false);
    setText("");
    setImageFileUrl(null);
    setSelectedFile(null);
    location.reload(); //page refresh
  };
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
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        {selectedFile && (
          <img
            src={imageFileUrl}
            alt="image"
            className={`max-h-[250px] w-full object-cover cursor-pointer
            ${imageFileUploading ? "animate-pulse" : ""}`}
          />
        )}

        <div className="flex items-center justify-between pt-2.5 ">
          <HiOutlinePhotograph
            onClick={() => imagePicRef.current.click()}
            className="h-10 w-10 p-2 text-sky-500 hover:gb-sky-100 rounded-full cursor-pointer"
          />
          <input
            type="file"
            ref={imagePicRef}
            accept="image/*"
            onChange={addImageToPost}
            hidden
          />
          <button
            disabled={text === "" || postLoading || imageFileUploading}
            className="px-4 py-1.5 rounded-full  shadow-md hover:brightness-95 disabled:opacity-50 font-bold bg-blue-400 text-white"
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
