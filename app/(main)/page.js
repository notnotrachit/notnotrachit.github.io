"use client";
import TypeIt from "typeit";
import { useEffect } from "react";
import Image from "next/image";
import Draggable, {DraggableCore} from 'react-draggable';
import Github_Graph from "@/components/gitgraph";
import Link from "next/link";

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
    <main className="bg-base-100 overflow-x-clip">
      <div className="flex justify-center py-5 bg-base-100" data-aos="zoom-in">
        <Draggable handle="handle">
          <div
            className="absolute bg-neutral pb-5 text-neutral-content rounded-box text-xl w-11/12 mx-2 lg:w-1/2 border-primary/50 border"
            id="window"
          >
            <handle>
              <div className="w-full bg-primary/50 rounded-t-box cursor-move flex justify-end px-2 py-1" id="windowheader">
              <div className="avatar placeholder mx-1">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-3">
                  <span className="text-xs"></span>
                </div>
              </div>
              <div className="avatar placeholder mx-1">
                <div className="bg-warning text-neutral-content rounded-full w-3">
                  <span className="text-xs"></span>
                </div>
              </div>
              <div className="avatar placeholder mx-1">
                <div className="bg-error text-neutral-content rounded-full w-3">
                  <span className="text-xs"></span>
                </div>
              </div>
              </div>
            </handle>
            <pre data-prefix="$" className="text-success ml-3">
              <code>$  python about_me.py</code>
            </pre>
            <div className="lg:flex lg:px-8">
              <div className="flex justify-center lg:py-5" data-aos="zoom-in">
                <div className="avatar hover:scale-110 transition-all ease-in-out">
                  <div className="w-24 lg:w-48 rounded-full hover:rounded-xl border-2 border-primary hover:border-none hover:ring ring-primary ring-offset-base-100 ring-offset-4 transition-all ease-in-out">
                    <Image
                      src="/profile.jpg"
                      alt="Rachit Khurana"
                      width={150}
                      height={150}
                      className=""
                    />
                  </div>
                </div>
              </div>
              <div className="w-full h-full m-auto">
                <div className="flex w-full justify-center" data-aos="zoom-in">
                  <h1 className="text-2xl lg:text-6xl font-bold mx-12">
                    Rachit Khurana
                  </h1>
                </div>
                <div className="flex w-full justify-center" data-aos="zoom-in">
                  <p id="element" className="text-xl lg:text-2xl italic"></p>
                </div>
              </div>
            </div>
            <p className="ml-5 text-base lg:text-lg leading-tight">
              a.k.a DiluteWater & notnotrachit
              <br />
              I&apos;m a passionate Full Stack Developer from India 🇮🇳
              <br />
              Also an open source enthusiast
              <br />
              Core Tech Team Member @{" "}
              <a href="https://gdscbu.club" target="_blank" className="underline">
                GDSC BU
              </a>{" "}
              &{" "}
              <a
                href="https://www.csi-bu.tech/"
                target="_blank"
                className="underline"
              >
                CSI BU
              </a>
            </p>
            <pre data-prefix="$" className="text-success ml-3 mt-5">
              <code>$  python contributions.py</code>
            </pre>           
             <Github_Graph/>
             <div className="text-base text-center">
              Feeling Techy enough? Check out the <Link href="/cli" className="italic underline">CLI version</Link> of my portfolio.
             </div>

          </div>
        </Draggable>
      </div>
    </main>
  );
}
