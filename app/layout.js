import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import AOSc from "@/components/aos";
import { FaGithub, FaLinkedin, FaTwitter, FaMastodon } from 'react-icons/fa'


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
      <body className={inter.className+" overflow-x-hidden mb-12"}>
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
                  <Link href='/skills'>Skills</Link>
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
              <ul className="flex flex-wrap">
                <div className="lg:flex">
                  <li className="mx-2 my-1">
                    <p className="flex"><a href="https://github.com/notnotrachit" target="_blank" className="flex hover:scale-110 transition-all ease-in-out">GitHub <FaGithub size={'1.5rem'} className="mx-2" /></a>|</p>
                  </li>
                  <hr className="border-neutral border-t-[0.5px] lg:hidden"/>
                  <li className="mx-2 my-1">
                    <p className="flex"><a href="https://twitter.com/notnotrachit" target="_blank" className="flex hover:scale-110 transition-all ease-in-out">Twitter <FaTwitter size={'1.5rem'} className="mx-2" /></a>|</p>
                  </li>
                </div>
                <div className="lg:flex">
                  <li className="mx-2 my-1">
                    <p className="flex"><a href="https://mastodon.social/@notnotrachit" target="_blank" className="flex hover:scale-110 transition-all ease-in-out">Mastodon <FaMastodon size={'1.5rem'} className="mx-2" /></a><span className="hidden lg:inline">|</span></p>
                  </li>
                  <hr className="border-neutral border-t-[0.5px] lg:hidden"/>
                  <li className="mx-2 my-1">
                    <p className="flex"><a href="https://www.linkedin.com/in/rachitkhurana1/" target="_blank" className="flex hover:scale-110 transition-all ease-in-out">LinkedIn <FaLinkedin size={'1.5rem'} className="mx-2" /></a></p>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
