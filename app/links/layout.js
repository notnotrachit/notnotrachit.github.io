import "app/(main)/globals.css";
import { Poppins } from "next/font/google";
import Link from "next/link";
import AOSc from "@/components/aos";
import { FaGithub, FaLinkedin, FaTwitter, FaMastodon } from 'react-icons/fa'
import Analytics from "@/components/analytics";

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
  return (
    <html lang="en" data-theme="night">
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

        {children}

      </body>
    </html>
  );
}
