"use client";
import TypeIt from "typeit";
import AOS from "aos";
import { useEffect } from "react";
import Image from "next/image";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 500 });
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
    <main className="bg-base-100">

      <div className="flex justify-center py-5 bg-base-100" data-aos="zoom-in">
        <div className="mockup-code text-xl w-screen mx-2 lg:w-1/2 border-primary/50 border">
          <pre data-prefix="$" className="text-success"><code>python about_me.py</code></pre>
          <div className="flex justify-center py-5" data-aos="zoom-in">
        <div className="avatar hover:scale-110 transition-all ease-in-out">
          <div className="w-24 lg:w-48 ring ring-primary ring-offset-base-100 ring-offset-2">
            <Image
              src="/profile.jpg"
              alt="Rachit Khurana"
              width={200}
              height={200}
              className=""
            />
          </div>
        </div>
      </div>
      <div
        className="flex w-full justify-center"
        data-aos="zoom-in"
      >
        <h1 className="text-3xl lg:text-8xl font-bold mx-12">Rachit Khurana</h1>
      </div>
      <div
        className="flex w-full justify-center"
        data-aos="zoom-in"
      >
        <p id="element" className="text-2xl italic"></p>
      </div>
          <p className="ml-5">
          a.k.a DiluteWater & notnotrachit<br/>
          I'm a passionate Full Stack Developer from India 🇮🇳<br/>
          Also an open source enthusiast<br/>
          Core Tech Team Member @ <a href="https://gdscbu.club" target="_blank" className="underline">GDSC BU</a> & <a href="https://www.csi-bu.tech/" target="_blank" className="underline">CSI BU</a></p>
        </div>
      </div>
    </main>
  );
}