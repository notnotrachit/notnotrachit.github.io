import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import AOSc from "@/components/aos";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rachit Khurana",
  description: "Full Stack Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="night">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
      </head>
      <body className={inter.className+" overflow-x-hidden"}>
        <div className="p-2 sticky z-50 bg-base-100 top-0">
          <AOSc />
          <div className="bg-primary text-neutral rounded-xl md:flex w-[99.5%] mx-[1%]">
            <div className="flex-cols md:flex-1 justify-center text-center md:text-left">
              <Link className="btn btn-ghost normal-case text-xl" href="/">
                Rachit Khurana
              </Link>
            </div>
            <div className="flex md:flex-none">
              <ul className="menu menu-horizontal px-1 justify-center">
                <li>
                  <Link href="/projects">Projects</Link>
                </li>
                <li>
                  <a>Experience</a>
                </li>
                <li>
                  <a>Skills</a>
                </li>
                <li>
                  <a>Education</a>
                </li>
                <li>
                  <a>Blog</a>
                </li>
                <li>
                  <a>Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {children}
        <div className="bg-base-100 fixed bottom-0 mb-3 w-full">
          <div className="w-full bg-primary text-neutral flex justify-center rounded-xl">
            <div className="">
              <ul className="flex">
                <li className="mx-2">
                  <a>GitHub</a>
                </li>
                <li className="mx-2">
                  <a>LinkedIn</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
