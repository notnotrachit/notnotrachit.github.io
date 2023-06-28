import Image from "next/image";
import clearai_logo from "../public/clearai.jpeg";
import gdsc from "../public/gdsc.svg";
import csi from "../public/csi.jpg";

export default function ExperienceCard() {
  return (
    <ol className="relative border-l border-gray-700" data-aos="zoom-in-up">
      <li className="mb-10 ml-10">
        <span className="absolute flex p-2 items-center justify-center w-20 h-20 rounded-full -left-10 ring-8 ring-gray-900 bg-blue-900">
          <Image
            src={clearai_logo}
            alt="Clear AI"
            width={100}
            height={100}
            className="rounded-full"
          />
        </span>
        <h3 className="flex ml-6 items-center mb-1 text-lg font-semibold text-base-content">
          Clear AI{" "}
          <span className="  text-sm font-medium mr-2 px-2.5 py-0.5 rounded bg-blue-900 text-blue-300 ml-3">
            Ongoing
          </span>
        </h3>
        <time className="block mb-2 ml-6 text-sm font-normal leading-none text-gray-500">
          From June 2023
        </time>
        <p className="text-base ml-6 font-normal text-gray-500 dark:text-gray-400">
          NextJS Developer Intern
        </p>
      </li>
      <li className="mb-10 ml-10">
        <span className="absolute p-2 flex items-center justify-center w-20 h-20  rounded-full -left-10 ring-8 ring-gray-900 bg-blue-900">
          <Image
            src={gdsc}
            width={100}
            height={100}
            className="rounded-full"
            alt="GDSC"
          />
        </span>
        <h3 className="mb-1 ml-6  text-lg font-semibold text-base-content">
          GDSC Bennett University{" "}
          <span className="  text-sm font-medium mr-2 px-2.5 py-0.5 rounded bg-blue-900 text-blue-300 ml-3">
            Ongoing
          </span>
        </h3>
        <time className="block mb-2 ml-6 text-sm font-normal leading-none text-gray-500">
          From November 2022
        </time>
        <p className="text-base ml-6 font-normal text-gray-400">
          Tech Team Member
        </p>
      </li>
      <li className="ml-10">
        <span className="absolute flex p-2 items-center justify-center w-20 h-20 rounded-full -left-10 ring-8 ring-gray-900 bg-blue-900">
          <Image
            src={csi}
            width={100}
            height={100}
            className="rounded-full"
            alt="CSI"
          />
        </span>
        <h3 className="ml-6 mb-1 text-lg font-semibold text-base-content">
          CSI Bennett University{" "}
          <span className="  text-sm font-medium mr-2 px-2.5 py-0.5 rounded bg-blue-900 text-blue-300 ml-3">
            Ongoing
          </span>
        </h3>
        <time className="ml-6 block mb-2 text-sm font-normal leading-none text-gray-500">
          From November 2022
        </time>
        <p className="ml-6 text-base font-normal text-gray-400">
          Tech Team Member
        </p>
      </li>
    </ol>
  );
}
