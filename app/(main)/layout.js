import "./globals.css";
import { Poppins } from "next/font/google";
import Link from "next/link";
import AOSc from "@/components/aos";
import { FaGithub, FaLinkedin, FaTwitter, FaMastodon } from 'react-icons/fa'
import { FaSquareXTwitter } from "react-icons/fa6";
import Analytics from "@/components/analytics";
import RetroGrid from "@/components/magicui/retro-grid";
import FooterDock from "@/components/footer";




const poppins = Poppins({ subsets: ["latin"],display: 'swap', weight: '500', style: 'normal' });

export const metadata = {
  title: "Rachit Khurana",
  description: "Full Stack Developer",
  image: "/profile.jpg",
  type: "website",
  siteName: "Rachit Khurana",
  twitterUsername: "@notnotrachit",
};

export default function RootLayout({ children }) {

  function scrollElementToView(scrollToId) {
    const element = document.querySelector(`#${scrollToId}`);

    const elRect = element.getBoundingClientRect();

    const scrollDistance = elRect.top + window.scrollY;
    const offset = Number(element.getAttribute('data-scroll-to-view-offset')) || 0;

    window.scrollTo({
      top: scrollDistance + offset,
      behavior: 'smooth'
    })
  }
  return (
    <html
      lang="en"
      data-theme="night"
      className="scroll-smooth"
      style={{ scrollBehavior: "smooth" }}
    >
      <head>
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
        <link rel="icon" href="/profile.jpg" sizes="any" />
        <link rel="favicon" href="/profile.ico" sizes="any" />
        <meta
          name="google-site-verification"
          content="zqYE4zRgKDrWS1JQzTGYub-w6p8EsdBN71nyGr_Mpb8"
        />
        <Analytics />
      </head>
      <body
        className={
          poppins.className +
          " overflow-x-hidden mb-24 lg:mb-12 text-base-content"
        }
      >
        <div className="p-2 sticky z-[45] top-0 bg-transparent">
          <AOSc />
          <div className="text-primary rounded-xl md:flex w-full px-[1%] backdrop-blur-2xl shadow-2xl shadow-primary border-2 border-primary">
            <div className="flex-cols md:flex-1 justify-center text-center md:text-left">
              <Link className="btn btn-ghost normal-case text-xl" href="/">
                Rachit Khurana
              </Link>
            </div>
            <div className="flex md:flex-none">
              <ul className="menu menu-horizontal px-1 justify-center">
                <li>
                  <Link href="/#experience" scroll={false}>
                    Experience
                  </Link>
                </li>
                <li>
                  <Link href="/#projects" scroll={false}>
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/#skills" scroll={false}>
                    Skills
                  </Link>
                </li>
                <li>
                  <Link href="/#education" scroll={false}>
                    Education
                  </Link>
                </li>
                <li>
                  <Link href="/blogs">Blog</Link>
                </li>
                {/* <li>
                  <Link href="/contact">Contact</Link>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        {children}
        <div className="fixed top-0 left-0 w-full h-full -z-20">
          <RetroGrid />
        </div>
        <FooterDock />
      </body>
    </html>
  );
}
