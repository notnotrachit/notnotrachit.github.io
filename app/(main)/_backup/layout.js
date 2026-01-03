import "./globals.css";
import { Poppins } from "next/font/google";
import Link from "next/link";
import AOSc from "@/components/aos";
import { FaGithub, FaLinkedin, FaTwitter, FaMastodon } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Analytics from "@/components/analytics";
import RetroGrid from "@/components/magicui/retro-grid";
import FooterDock from "@/components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "500",
  style: "normal",
});

export const metadata = {
  title: "Rachit Khurana - Full Stack Developer",
  description: "Full Stack Developer specializing in React, Next.js, Python, and Web3. Lead at FOSS Club Bennett University & Microsoft Learn Student Ambassador.",
  keywords: "Full Stack Developer, React, Next.js, Python, Web3, JavaScript, Golang, React Native, Portfolio",
  author: "Rachit Khurana",
  image: "/profile.jpg",
  url: "https://rachitkhurana.tech",
  type: "website",
  siteName: "Rachit Khurana",
  twitterUsername: "@notnotrachit",
  openGraph: {
    title: "Rachit Khurana - Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, Python, and Web3",
    url: "https://rachitkhurana.tech",
    siteName: "Rachit Khurana",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Rachit Khurana",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rachit Khurana - Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, Python, and Web3",
    creator: "@notnotrachit",
    images: ["/profile.jpg"],
  },
};

export default function RootLayout({ children }) {
  function scrollElementToView(scrollToId) {
    const element = document.querySelector(`#${scrollToId}`);

    const elRect = element.getBoundingClientRect();

    const scrollDistance = elRect.top + window.scrollY;
    const offset =
      Number(element.getAttribute("data-scroll-to-view-offset")) || 0;

    window.scrollTo({
      top: scrollDistance + offset,
      behavior: "smooth",
    });
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
        <a rel="me" href="https://mastodon.social/@notnotrachit">
          Mastodon
        </a>
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
          <div className="text-primary rounded-xl w-full px-[1%] backdrop-blur-2xl shadow-2xl shadow-primary border-2 border-primary">
            {/* Desktop Navigation */}
            <div className="hidden md:flex">
              <div className="flex-1 justify-center text-left">
                <Link className="btn btn-ghost normal-case text-xl" href="/">
                  Rachit Khurana
                </Link>
              </div>
              <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
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
                </ul>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <div className="navbar">
                <div className="navbar-start">
                  <Link className="btn btn-ghost normal-case text-xl" href="/">
                    Rachit Khurana
                  </Link>
                </div>
                <div className="navbar-end">
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost">
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h15M1 7h15M1 13h15"
                        />
                      </svg>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-primary/30"
                    >
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
                    </ul>
                  </div>
                </div>
              </div>
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
