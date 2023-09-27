"use client";
import TypeIt from "typeit";
import { useEffect } from "react";
import Image from "next/image";
import Draggable, { DraggableCore } from "react-draggable";
import HomeCard from "@/components/home";

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
      <div className="flex justify-start py-5 bg-base-100" data-aos="zoom-in">
        <div className="hidden md:flex w-full justify-center">
          <Draggable handle="handle">
            <div
              className="absolute bg-neutral pb-5 text-neutral-content rounded-box text-xl w-11/12 mx-2 lg:w-1/2 border-primary/50 border"
              id="window"
            >
              <handle>
                <div
                  className="w-full bg-primary/50 rounded-t-box cursor-move flex justify-end px-2 py-1"
                  id="windowheader"
                >
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
              <HomeCard />
            </div>
          </Draggable>
        </div>
        <div className="md:hidden flex justify-center w-full">
          <div
            className="absolute bg-neutral pb-5 text-neutral-content rounded-box text-xl w-11/12 mx-2 lg:w-1/2 border-primary/50 border"
            id="window"
          >
            <handle>
              <div
                className="w-full bg-primary/50 rounded-t-box cursor-move flex justify-end px-2 py-1"
                id="windowheader"
              >
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
            <HomeCard />
          </div>
        </div>
      </div>
    </main>
  );
}
