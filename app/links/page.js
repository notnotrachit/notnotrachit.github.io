import Image from "next/image";
import {
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaMastodon,
  FaAt,
  FaInstagram,
  FaSnapchat,
  FaDev,
  FaDiscord,
  FaTelegram,
  FaReddit,
  FaGlobe,
  FaSpotify,
  FaQrcode
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { SiHashnode, SiKofi, SiBuymeacoffee } from "react-icons/si";
import { BsMedium } from "react-icons/bs";

import { Client, Databases } from "appwrite";
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("64707ef1e67c12fddb64");

const databases = new Databases(client);
const promise = databases.listDocuments("64a5b76b763a44692038", "linkslist");
promise.then(
  function (response) {
    console.log("Got links");
  },
  function (error) {
    console.log(error);
  }
);


export default async function links() {
  const all_links = (await promise).documents;
  return (
    <>
      <div className="flex justify-center bg-base-100 overflow-x-hidden overflow-y-hidden">
        <div>
          <Image
            src="/profile.jpg"
            alt="Profile Pic"
            width={150}
            height={150}
            className="mx-auto my-10 rounded-full hover:rounded-xl transition-all ease-in-out hover:scale-110 border-primary border-2"
          />
          <div className="text-base-content text-5xl font-bold text-center hover:text-primary">
            Rachit Khurana
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-base-100 py-10 overflow-x-hidden overflow-y-visible">
        <div className="md:w-1/2 lg:w-1/3 flex flex-wrap justify-center gap-4">
          <a
            href="/"
            className="tooltip tooltip-bottom tooltip-primary"
            target="_blank"
            data-tip="Portfolio website"
          >
            <button className="hover:bg-primary hover:text-primary-content rounded-xl transition-all ease-in-out p-2 text-5xl">
              <FaGlobe className="mx-auto" />
            </button>
          </a>

          <a
            href="https://github.com/notnotrachit"
            className="tooltip tooltip-bottom tooltip-primary"
            target="_blank"
            data-tip="GitHub: notnotrachit"
          >
            <button className="hover:bg-primary hover:text-primary-content rounded-xl transition-all ease-in-out p-2 text-5xl">
              <FaGithub className="mx-auto" />
            </button>
          </a>

          <a
            href="https://x.com/notnotrachit"
            className="tooltip tooltip-bottom tooltip-primary"
            target="_blank"
            data-tip="Twitter/𝕏: notnotrachit"
          >
            <button className="hover:bg-primary hover:text-primary-content rounded-xl transition-all ease-in-out p-2 text-5xl">
              <FaSquareXTwitter className="mx-auto" />
            </button>
          </a>

          <a
            href="https://www.threads.net/@notnotrachit"
            className="tooltip tooltip-bottom tooltip-primary"
            target="_blank"
            data-tip="Threads: notnotrachit"
          >
            <button className="hover:bg-primary hover:text-primary-content rounded-xl transition-all ease-in-out p-2 text-5xl">
              <svg
                aria-label="Threads"
                class="fill-current"
                height="3rem"
                role="img"
                viewBox="0 0 192 192"
                width="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="xmcdc9a"
                  d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"
                ></path>
              </svg>
            </button>
          </a>

          <a
            href="https://www.linkedin.com/in/rachitkhurana1/"
            className="tooltip tooltip-bottom tooltip-primary"
            target="_blank"
            data-tip="LinkedIn: rachitkhurana1"
          >
            <button className="hover:bg-primary hover:text-primary-content rounded-xl transition-all ease-in-out p-2 text-5xl">
              <FaLinkedin className="mx-auto" />
            </button>
          </a>

          <a
            href="https://mastodon.social/@notnotrachit"
            className="tooltip tooltip-bottom tooltip-primary"
            target="_blank"
            data-tip="Mastodon: notnotrachit"
          >
            <button className="hover:bg-primary hover:text-primary-content rounded-xl transition-all ease-in-out p-2 text-5xl">
              <FaMastodon className="mx-auto" />
            </button>
          </a>

          <a
            href="https://bsky.app/profile/notnotrachit.bsky.social"
            className="tooltip tooltip-bottom tooltip-primary"
            target="_blank"
            data-tip="BlueSky: notnotrachit"
          >
            <button className="hover:bg-primary hover:text-primary-content rounded-xl transition-all ease-in-out p-2 text-5xl">
              <FaAt className="mx-auto" />
            </button>
          </a>

          <a
            href="mailto:notnotrachit@gmail.com"
            className="tooltip tooltip-bottom tooltip-primary"
            target="_blank"
            data-tip="Mail: notnotrachit@gmail.com"
          >
            <button className="hover:bg-primary hover:text-primary-content rounded-xl transition-all ease-in-out p-2 text-5xl">
              <MdEmail className="mx-auto" />
            </button>
          </a>

          <a
            href="https://instagram.com/notnotrachit"
            className="tooltip tooltip-bottom tooltip-primary"
            target="_blank"
            data-tip="Instagram: notnotrachit"
          >
            <button className="hover:bg-primary hover:text-primary-content rounded-xl transition-all ease-in-out p-2 text-5xl">
              <FaInstagram className="mx-auto" />
            </button>
          </a>

          <a
            href="https://www.snapchat.com/add/notnotrachit"
            className="tooltip tooltip-bottom tooltip-primary"
            target="_blank"
            data-tip="Snapchat: notnotrachit"
          >
            <button className="hover:bg-primary hover:text-primary-content rounded-xl transition-all ease-in-out p-2 text-5xl">
              <FaSnapchat className="mx-auto" />
            </button>
          </a>

          <a
            href="https://open.spotify.com/user/ia2267ov7v3cs2923ecnxpqoe"
            className="tooltip tooltip-bottom tooltip-primary"
            target="_blank"
            data-tip="Spotify"
          >
            <button className="hover:bg-primary hover:text-primary-content rounded-xl transition-all ease-in-out p-2 text-5xl">
              <FaSpotify className="mx-auto" />
            </button>
          </a>

          <a
            href="https://discordapp.com/users/744224056966119565"
            className="tooltip tooltip-bottom tooltip-primary"
            target="_blank"
            data-tip="Discord: dilutewater"
          >
            <button className="hover:bg-primary hover:text-primary-content rounded-xl transition-all ease-in-out p-2 text-5xl">
              <FaDiscord className="mx-auto" />
            </button>
          </a>

          <a
            href="https://t.me/dilutewater"
            className="tooltip tooltip-bottom tooltip-primary"
            target="_blank"
            data-tip="Telegram: dilutewater"
          >
            <button className="hover:bg-primary hover:text-primary-content rounded-xl transition-all ease-in-out p-2 text-5xl">
              <FaTelegram className="mx-auto" />
            </button>
          </a>

          <a
            href="https://www.reddit.com/user/rachitkhurana"
            className="tooltip tooltip-bottom tooltip-primary"
            target="_blank"
            data-tip="Reddit: rachitkhurana"
          >
            <button className="hover:bg-primary hover:text-primary-content rounded-xl transition-all ease-in-out p-2 text-5xl">
              <FaReddit className="mx-auto" />
            </button>
          </a>

          <a
            href="https://dev.to/dilutewater"
            className="tooltip tooltip-bottom tooltip-primary"
            target="_blank"
            data-tip="Dev.to: dilutewater"
          >
            <button className="hover:bg-primary hover:text-primary-content rounded-xl transition-all ease-in-out p-2 text-5xl">
              <FaDev className="mx-auto" />
            </button>
          </a>

          <a
            href="https://dilutewater.hashnode.dev/"
            className="tooltip tooltip-bottom tooltip-primary"
            target="_blank"
            data-tip="Hashnode: rachitkhurana"
          >
            <button className="hover:bg-primary hover:text-primary-content rounded-xl transition-all ease-in-out p-2 text-5xl">
              <SiHashnode className="mx-auto" />
            </button>
          </a>

          <a
            href="https://medium.com/@dilutewater"
            className="tooltip tooltip-bottom tooltip-primary"
            target="_blank"
            data-tip="Medium: dilutewater"
          >
            <button className="hover:bg-primary hover:text-primary-content rounded-xl transition-all ease-in-out p-2 text-5xl">
              <BsMedium className="mx-auto" />
            </button>
          </a>

          <a
            href="https://ko-fi.com/rachitkhurana"
            className="tooltip tooltip-bottom tooltip-primary"
            target="_blank"
            data-tip="Ko-Fi: rachitkhurana"
          >
            <button className="hover:bg-primary hover:text-primary-content rounded-xl transition-all ease-in-out p-2 text-5xl">
              <SiKofi className="mx-auto" />
            </button>
          </a>

          <a
            href="https://www.buymeacoffee.com/notnotrachit"
            className="tooltip tooltip-bottom tooltip-primary"
            target="_blank"
            data-tip="Buy Me a Coffee: notnotrachit"
          >
            <button className="hover:bg-primary hover:text-primary-content rounded-xl transition-all ease-in-out p-2 text-5xl">
              <SiBuymeacoffee className="mx-auto" />
            </button>
          </a>

          <a
            href="upi://pay?pa=rachitkhurana@pingpay&cu=INR"
            className="tooltip tooltip-bottom tooltip-primary"
            target="_blank"
            data-tip="UPI: rachitkhurana@pingpay"
          >
            <button className="hover:bg-primary hover:text-primary-content rounded-xl transition-all ease-in-out p-2 text-5xl">
              <FaQrcode className="mx-auto" />
            </button>
          </a>
        </div>
      </div>

      <div className="flex justify-center text-left bg-base-100 overflow-x-hidden overflow-y-hidden">
        <div className="text-4xl">Links</div>
      </div>
      <div className="bg-base-100 overflow-x-hidden overflow-y-visible">
        {all_links.map((link) => (
          <div
            className="flex flex-col justify-center items-center py-5"
            key={link.title}
          >
            <a href={link.link} target="_blank">
              <button className="btn btn-outline btn-primary normal-case">
                {link.title}
              </button>
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
