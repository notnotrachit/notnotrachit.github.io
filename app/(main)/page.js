"use client";
import TypeIt from "typeit";
import { useEffect } from "react";
import Image from "next/image";
import Draggable, { DraggableCore } from "react-draggable";
import Github_Graph from "@/components/gitgraph";
import Link from "next/link";
import BlurIn from "@/components/magicui/blur-in";
import ShineBorder from "@/components/magicui/shine-border";
import ExperienceCard from "@/components/experience";
import {ExperienceTimeLine} from "@/components/ExpTimeline";

import { Chakra_Petch, Press_Start_2P, Source_Code_Pro } from "next/font/google";
import { ProjectCards } from "@/components/cards";

// const petch = Chakra_Petch({ subsets: ["latin"], display: 'swap', weight: '500', style: 'normal' });
const petch = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: "normal",
});

export default function Home() {


  useEffect(() => {
    new TypeIt("#element", {
      lifeLike: false,
      speed: 0,
    })
      .type("C")
      .pause(100)
      .type("o")
      .pause(100)
      .type("f")
      .pause(100)
      .type("f")
      .pause(100)
      .type("e")
      .pause(100)
      .type("e")
      .pause(250)
      .delete(1)
      .pause(660)
      .delete(1)
      .pause(41)
      .delete(1)
      .pause(40)
      .delete(1)
      .pause(39)
      .delete(1)
      .pause(41)
      .delete(1)
      .pause(470)
      .type("C")
      .pause(100)
      .type("a")
      .pause(100)
      .type("f")
      .pause(100)
      .type("f")
      .pause(100)
      .type("e")
      .pause(100)
      .type("i")
      .pause(100)
      .type("n")
      .pause(100)
      .type("e")
      .pause(100)
      .type(" ")
      .pause(400)
      .type("P")
      .pause(100)
      .type("o")
      .pause(100)
      .type("w")
      .pause(100)
      .type("e")
      .pause(100)
      .type("r")
      .pause(100)
      .type("e")
      .pause(100)
      .type("d")
      .pause(100)
      .type(" ")
      .pause(500)
      .type("C")
      .pause(100)
      .type("o")
      .pause(100)
      .type("d")
      .pause(19)
      .type("e")
      .pause(19)
      .type("r")
      .pause(100)
      .delete(1)
      .pause(130)
      .type("r")
      .pause(537)
      .delete(1)
      .pause(143)
      .delete(1)
      .pause(141)
      .delete(1)
      .pause(134)
      .delete(1)
      .pause(157)
      .delete(1)
      .pause(683)
      .type("B")
      .pause(100)
      .type("i")
      .pause(100)
      .type("t")
      .pause(100)
      .type(" ")
      .pause(300)
      .type("F")
      .pause(100)
      .type("l")
      .pause(100)
      .type("i")
      .pause(100)
      .type("p")
      .pause(100)
      .type("p")
      .pause(100)
      .type("e")
      .pause(100)
      .type("r")
      .go();
  }, []);

  return (
    <div className="bg-opacity-0">
      <div className="flex justify-center py-16 bg-opacity-0 bg-white ">
        <div className="flex flex-col lg:flex-row">
          <div className="flex justify-center">
            <Image
              src="/profile.jpg"
              alt="Rachit Khurana"
              width={300}
              height={300}
              className="rounded-full outline outline-primary outline-offset-4 hover:outline-offset-0 transition-all ease-in-out hover:scale-125 drop-shadow-2xl w-36 lg:w-48 h-auto hover:rotate-[360deg] duration-500"
            />
          </div>
          <div className="flex flex-col h-full justify-center">
            <BlurIn
              word="Rachit Khurana"
              className="text-2xl lg:text-6xl font-bold mx-12 my-3"
            />
            <BlurIn
              word="a.k.a DiluteWater/notnotrachit"
              className="text-md mx-12 mb-8"
            />
            <div className="flex w-full ml-10" data-aos="zoom-in">
              <p
                id="element"
                className={"text-xl lg:text-3xl font-bold " + petch.className}
              ></p>
            </div>
          </div>

          {/* <div class="relative flex justify-center items-center h-screen w-screen">
            <div
              class="h-24 w-[400%] bg-indigo-500 
            rounded-t-full"
            ></div>
          </div> */}
          {/* <div className="curved-div w-screen h-24 backdrop-blur-md bg-primary/10 -mt-8 z-[9999]"></div> */}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="backdrop-blur-sm border border-primary rounded-xl w-full lg:w-[48rem] p-5">
          {/* <Github_Graph /> */}
          <div className="text-center w-full text-2xl font-semibold">
            About Me
          </div>
          <div className="">
            Hello there
            <span className="inline-flex">
              <picture className="mx-1">
                <source
                  srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.webp"
                  type="image/webp"
                />
                <img
                  src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.gif"
                  alt="👋"
                  width="20"
                  height="20"
                />
              </picture>
            </span>
            , I am Rachit Khurana, a full stack developer. Currently pursuing
            BTech CSE at Bennett University (2022-2026){" "}
            <span className="inline-flex">
              <source
                srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f393/512.webp"
                type="image/webp"
              />
              <img
                src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f393/512.gif"
                alt="🎓"
                width="20"
                height="20"
              />
            </span>
            . I am also a Microsoft Learn Student Ambassador
            <span className="inline-flex">
              <img src="./mlsa.png" alt="🎓" width="20" height="20" />
            </span>
            . Currently exploring the cloud computing field ☁️. I am also a FOSS
            enthusiast.
            <br />
            <br />I love to build stuff and learn new technologies.
          </div>
        </div>
      </div>

      <section className="py-16" id="experience">
        <div className="text-5xl w-full text-center font-bold underline underline-offset-2">
          Experience
        </div>
        <div className="text-3xl w-full text-center my-4">Work Experience</div>
        <div className="my-8">
          <div className="flex justify-center">
            <ShineBorder color="#38BCF8">
              <div className="backdrop-blur-sm rounded-xl w-full lg:w-[48rem] p-5 flex gap-4 border-[0.3px] border-primary/50">
                <div>
                  <Image
                    src="/clearai.jpeg"
                    alt="ClearMind AI"
                    width={250}
                    height={250}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <div className="w-full text-2xl font-semibold">
                    ClearMind AI
                  </div>
                  <div>
                    <span className="text-lg">
                      Role: Full Stack Developer Intern{" "}
                    </span>
                  </div>
                  <div className="">
                    As a full stack intern I engineered the entire ClearMind
                    Journaling Web App, leveraging NextJS and tailwind
                    frameworks to seamlessly integrate OpenAI and Microsoft
                    Azure APIs, scaled from nil to more than 45k+ registered
                    users
                  </div>
                </div>
              </div>
            </ShineBorder>
          </div>
        </div>

        <div className="text-3xl w-full text-center my-4">Community Experience</div>
        <div className="-mt-20 flex justify-center">
            {/* <ExperienceCard /> */}
            <ExperienceTimeLine />
        </div>
        <div className="mx-10 lg:mx-40">
          <ProjectCards />
        </div>
      </section>
    </div>
  );
}
