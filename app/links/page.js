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
} from "react-icons/fa";
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
      <div className="flex justify-center bg-base-100">
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
      <div className="flex justify-center bg-base-100 py-10">
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
            href="https://twitter.com/notnotrachit"
            className="tooltip tooltip-bottom tooltip-primary"
            target="_blank"
            data-tip="Twitter: notnotrachit"
          >
            <button className="hover:bg-primary hover:text-primary-content rounded-xl transition-all ease-in-out p-2 text-5xl">
              <FaTwitter className="mx-auto" />
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
        </div>
      </div>

      <div className="flex justify-center text-left bg-base-100">
        <div className="text-4xl">Links</div>
      </div>
      <div className="bg-base-100">
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
