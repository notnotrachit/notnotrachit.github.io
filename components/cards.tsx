"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/use-outside-click";
import ProjectData from "../data/projects.json";

export function ProjectCards() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-md h-full w-full z-50"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="max-w-[500px] h-fit md:max-h-[90%]  flex flex-col bg-primary/70 rounded-xl overflow-hidden mx-4 backdrop-blur-xl"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={100}
                  height={100}
                  src={active.src}
                  alt={active.title}
                  className="w-full bg-[#226890] backdrop-blur-md"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-black text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-black/70 text-base"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="flex gap-1 flex-wrap px-4">
                  {active.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className={`text-xs text-black rounded px-2 py-1 mt-2 ${
                        tech === "Python"
                          ? "bg-yellow-500"
                          : tech === "Django"
                          ? "bg-green-500"
                          : tech === "HTML"
                          ? "bg-red-500"
                          : tech === "CSS"
                          ? "bg-blue-500"
                          : tech === "JavaScript"
                          ? "bg-yellow-500"
                          : tech === "Javascript"
                          ? "bg-yellow-500"
                          : tech === "JS"
                          ? "bg-yellow-500"
                          : tech === "React"
                          ? "bg-blue-500"
                          : tech === "NextJS"
                          ? "bg-black text-white"
                          : tech === "TailwindCSS"
                          ? "bg-blue-500"
                          : tech === "Node.js"
                          ? "bg-green-500"
                          : tech === "Express.js"
                          ? "bg-gray-500"
                          : tech === "MongoDB"
                          ? "bg-green-500"
                          : tech === "PostgreSQL"
                          ? "bg-blue-500"
                          : tech === "SQLite"
                          ? "bg-gray-500"
                          : tech === "Flask"
                          ? "bg-[#3CAABE]"
                          : tech === "Tailwind"
                          ? "bg-blue-500"
                          : tech === "FastAPI"
                          ? "bg-[#079789]"
                          : "bg-gray-500"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-black/70 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto[mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                    {/* url button */}
                  {active.url && (
                  <div className="flex justify-center items-center">
                    <motion.a
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      href={active.url}
                      target="_blank"
                      className="px-4 py-3 text-sm rounded font-bold bg-green-500 text-white mb-4"
                    >
                      Visit
                    </motion.a>
                  </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="mx-auto w-full grid grid-cols-1 md:grid-cols-4 items-start gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col bg-primary/30 border-2 border-primary rounded-xl cursor-pointer mt-36 backdrop-blur-md"
          >
            <div className="flex gap-4 flex-col  w-full">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="w-full -mt-36 rounded-t-xl bg-primary-content/70 backdrop-blur-md aspect-video object-scale-down border-t-2 border-primary"
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="text-white text-center md:text-left text-base font-bold"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-gray-200 text-center md:text-left text-base"
                >
                  {card.description}
                </motion.p>
                <div className="flex gap-1 flex-wrap">
                  {card.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className={`text-xs text-black rounded px-2 py-1 mt-2 ${
                        tech === "Python"
                          ? "bg-yellow-500"
                          : tech === "Django"
                          ? "bg-green-500"
                          : tech === "HTML"
                          ? "bg-red-500"
                          : tech === "CSS"
                          ? "bg-blue-500"
                          : tech === "JavaScript"
                          ? "bg-yellow-500"
                          : tech === "Javascript"
                          ? "bg-yellow-500"
                          : tech === "JS"
                          ? "bg-yellow-500"
                          : tech === "React"
                          ? "bg-blue-500"
                          : tech === "NextJS"
                          ? "bg-black text-white"
                          : tech === "TailwindCSS"
                          ? "bg-blue-500"
                          : tech === "Node.js"
                          ? "bg-green-500"
                          : tech === "Express.js"
                          ? "bg-gray-500"
                          : tech === "MongoDB"
                          ? "bg-green-500"
                          : tech === "PostgreSQL"
                          ? "bg-blue-500"
                          : tech === "SQLite"
                          ? "bg-gray-500"
                          : tech === "Flask"
                          ? "bg-[#3CAABE]"
                          : tech === "Tailwind"
                          ? "bg-blue-500"
                          : tech === "FastAPI"
                          ? "bg-[#079789]"
                          : "bg-gray-500"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [];
const orig_data = ProjectData.documents;
for (let i = 0; i < orig_data.length; i++) {
  cards.push({
    description: orig_data[i].description,
    title: orig_data[i].name,
    src:
      orig_data[i].image_url ||
      "/projects/" + orig_data[i].image_name ||
      "https://placehold.co/400",
    ctaText: "GitHub",
    ctaLink: orig_data[i].GitHub,
    techStack: orig_data[i].Tech_stack,
    url: orig_data[i].URL,
    content: () => {
      return <p>{orig_data[i].long_description}</p>;
    },
  });
}
