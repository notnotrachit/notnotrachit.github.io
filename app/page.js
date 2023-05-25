"use client";
import TypeIt from "typeit";
import AOS from "aos";
import { useEffect } from "react";


export default function Home() {
  useEffect(() => {
  AOS.init({ duration: 2000 });
  new TypeIt("#element", {
    strings: "This is my portfolio!",
    speed: 75,
    loop: true,
  }).go();
}, []);

  return (
    <main className="bg-base-100">
      <div className="flex-rows w-full justify-center bg-base-100" data-aos="zoom-in">
        <h1 className="text-4xl font-bold">Rachit Khurana</h1>
        <p id="element"></p>
      </div>
    </main>
  )
}
