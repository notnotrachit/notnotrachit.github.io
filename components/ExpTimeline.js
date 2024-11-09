import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { LinkPreview } from "@/components/ui/link-preview";


export function ExperienceTimeLine() {
  const data = [
    {
      title: "FOSS Club Bennett University",
      content: (
        <div className="">
          <div className="flex items-center">
            <Image
              src={"/foss.png"}
              height={200}
              width={200}
              className="rounded-[2rem] w-36 lg:w-48"
              alt="FOSS"
            />
            <div>
              <span className="text-sm font-medium mr-2 px-2.5 py-0.5 rounded bg-blue-900 text-blue-300 ml-6 mb-3">
                Ongoing
              </span>
              <time className="block mb-1 ml-6 mt-3 text-sm font-normal leading-none text-gray-500">
                September, 2024
              </time>
              <p className="text-xl mb-2 ml-6 font-normal text-gray-500 dark:text-gray-400">
                Lead
              </p>
            </div>
          </div>
          <div className="mt-4">
            I am the founding Lead of FOSS Club Bennett University.
            <br />
            Its a college chapter of FOSS United.
            <br />
            Conducted many events like Hacktoberfest, GitGoing, FOSS Frontier
            etc. We aim to promote Open Source and help students to contribute
            to Open Source.
          </div>
        </div>
      ),
    },
    {
      title: "Microsoft Learn Student Ambassador",
      content: (
        <div className="">
          <div className="flex items-center">
            <Image
              src={"/mlsa.png"}
              height={200}
              width={200}
              className="w-36 lg:w-48"
              alt="MLSA"
            />
            <div>
              <span className="text-sm font-medium mr-2 px-2.5 py-0.5 rounded bg-blue-900 text-blue-300 ml-6 mb-3">
                Ongoing
              </span>
              <time className="block mb-1 ml-6 mt-3 text-sm font-normal leading-none text-gray-500">
                14th September, 2023
              </time>
              <p className="text-xl mb-2 ml-6 font-normal text-gray-500 dark:text-gray-400">
                Beta MLSA
              </p>
              <time className="block mb-1 ml-6 text-sm font-normal leading-none text-gray-500">
                2nd September, 2023
              </time>
              <p className="text-l mb-2 ml-6 font-normal text-gray-500 dark:text-gray-400">
                Alpha MLSA
              </p>
              <time className="block mb-1 ml-6 text-sm font-normal leading-none text-gray-500">
                31st August, 2023
              </time>
              <p className="text-l ml-6 font-normal text-gray-500 dark:text-gray-400">
                Selected as a new MLSA
              </p>
            </div>
          </div>
          <div className="mt-4">
            I have conducted many events under MLSA like HYPE, Django Workshop,
            <br /> Building a RAG using Azure, etc.
          </div>
        </div>
      ),
    },
    {
      title: "CSI Bennett University",
      content: (
        <div className="">
          <div className="flex items-center">
            <Image
              src={"/csi.jpg"}
              height={200}
              width={200}
              className="rounded-full w-36 lg:w-48"
              alt="CSI"
            />
            <div>
              <time className="block mb-1 ml-6 mt-3 text-sm font-normal leading-none text-gray-500">
                November 2022 - August 2023
              </time>
              <p className="text-xl mb-2 ml-6 font-normal text-gray-500 dark:text-gray-400">
                Chief of Tech
              </p>
              <time className="block mb-1 ml-6 text-sm font-normal leading-none text-gray-500">
                November 2022 - August 2023
              </time>
              <p className="text-l mb-2 ml-6 font-normal text-gray-500 dark:text-gray-400">
                Tech Team Member
              </p>
            </div>
          </div>
          <div className="mt-4">
            We at CSI BU conducted a lot of amazing Workshops, events,
            hackathons etc.
            <br /> One of the major event was our flagship event{" "}
            <LinkPreview
              url="https://www.hackaccino.tech/"
              className="font-bold underline transition-all ease-in-out hover:text-primary hover:scale-105"
            >
              Hackaccino
            </LinkPreview>
            .
          </div>
        </div>
      ),
    },
    {
      title: "GDSC Bennett University",
      content: (
        <div className="">
          <div className="flex items-center">
            <Image
              src={"/gdsc.svg"}
              height={200}
              width={200}
              className="rounded-full w-36 lg:w-48"
              alt="GDSC"
            />
            <div>
              <time className="block mb-1 ml-6 text-sm font-normal leading-none text-gray-500">
                November 2022 - August 2023
              </time>
              <p className="text-l mb-2 ml-6 font-normal text-gray-500 dark:text-gray-400">
                Tech Team Member
              </p>
            </div>
          </div>
          <div className="mt-4">
            We at GDSC BU conducted a lot of amazing events which included our{" "}
            <br />
            flagship event, Google Week.
          </div>
        </div>
      ),
    },
  ];
  return (
    (<div className="w-full">
      <Timeline data={data} />
    </div>)
  );
}
