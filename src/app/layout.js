import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import News from "@/components/News";
import SessionWrapper from "@/components/SessionWrapper";
import CommentModel from "@/components/CommentModel";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: " X Clone Next App",
  description: " A clone of the X website built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex justify-between max-w-6xl mx-auto">
            <div className="hidden sm:inline border-r h-screen sticky top-0 ">
              <Sidebar />
            </div>
            <div className="w-2xl flex-1">{children}</div>

            <div className="lg:flex-col p-3 h-screen border-l hidden lg:flex w-[360px]">
              <div className="sticky top-0 bg-white py-2">
                {" "}
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-gray-100 border border-gray-200 rounded-3xl text-sm w-full px-4 py-2"
                ></input>
              </div>
              <News />
            </div>
          </div>
          <CommentModel />
        </body>
      </html>
    </SessionWrapper>
  );
}
