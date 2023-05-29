import Image from "next/image";
export default function Education_Card() {
  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700">
      <li className="mb-10 ml-10">
        <span className="absolute flex p-2 items-center justify-center w-20 h-20 rounded-full -left-10 ring-8 ring-gray-900 bg-blue-900">
          <Image
            src="/bennett.png"
            alt="Bennett University"
            width={100}
            height={100}
            className="rounded-full"
          />
        </span>
        <h3 className="flex ml-6 items-center mb-1 text-lg font-semibold text-white">
          Bennett University{" "}
          <span className="  text-sm font-medium mr-2 px-2.5 py-0.5 rounded bg-blue-900 text-blue-300 ml-3">
            Ongoing
          </span>
        </h3>
        <time className="block mb-2 ml-6 text-sm font-normal leading-none text-gray-500">
          2022 - 2026
        </time>
        <p className="text-base ml-6 font-normal text-gray-500 dark:text-gray-400">
          BTech CSE
        </p>
      </li>
      <li className="mb-10 ml-10">
        <span className="absolute p-2 flex items-center justify-center w-20 h-20  rounded-full -left-10 ring-8 ring-gray-900 bg-blue-900">
          <Image
             src="/spv.jpg"
             width={100}
             height={100}
             className="rounded-full"
             alt="SPV"
          />

        </span>
        <h3 className="mb-1 ml-6  text-lg font-semibold text-white">
          Sardar Patel Vidyalaya{" "}
        </h3>
        <time className="block mb-2 ml-6 text-sm font-normal leading-none text-gray-500">
          2020-2022
        </time>
        <p className="text-base ml-6 font-normal text-gray-400">
          XI - XII<br/>
          XII Boards - 84.8%
        </p>
      </li>
      <li className="ml-10">
        <span className="absolute flex p-2 items-center justify-center w-20 h-20 rounded-full -left-10 ring-8 ring-gray-900 bg-blue-900">
          <Image
            src="/apeejay.jpg"
            width={100}
            height={100}
            className="rounded-full"
            alt="Apeejay"
          />
        </span>
        <h3 className="ml-6 mb-1 text-lg font-semibold text-white">
          Apeejay School Noida{" "}
        </h3>
        <time className="ml-6 block mb-2 text-sm font-normal leading-none text-gray-500">
          2008-2020
        </time>
        <p className="ml-6 text-base font-normal text-gray-400">
          Nursery - X<br/>
          X Boards - 90.2%
        </p>
      </li>
    </ol>
  );
}
