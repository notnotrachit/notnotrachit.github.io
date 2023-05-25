import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

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
      <body className={inter.className}>
        <div className="p-2 bg-base-100 w-screen">
          <div className="bg-primary rounded-xl lg:flex">
            <div className="flex-cols lg:flex-1 justify-center text-center lg:text-left">
              <Link className="btn btn-ghost normal-case text-xl" href="/">
                Rachit Khurana
              </Link>
            </div>
            <div className="flex lg:flex-none">
              <ul className="menu menu-horizontal px-1 justify-center">
                <li>
                  <a>About</a>
                </li>
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
          <div className="w-full bg-primary flex justify-center rounded-xl">
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
