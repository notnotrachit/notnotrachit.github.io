import Image from "next/image";
import Link from "next/link";
import Github_Graph from "@/components/gitgraph";

export default function HomeCard() {
    return (
        <>
        <pre data-prefix="$" className="text-success ml-3">
          <code>$ python about_me.py</code>
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
          a.k.a DiluteWater & notnotrachit, a passionate Full Stack Developer
          from India 🇮🇳
          <br />
          Open source enthusiast, Pythonista, Linux lover
          <br />
          Ex Intern @ Clearmind AI
          <br />
          Microsoft Learn Student Ambassador, Postman Student Expert
          <br />
          Chief of Tech @{" "}
          <a
            href="https://www.csi-bu.live/"
            target="_blank"
            className="underline"
          >
            CSI BU
          </a>
        </p>
        <pre data-prefix="$" className="text-success ml-3 mt-5">
          <code>$ python contributions.py</code>
        </pre>
        <Github_Graph />
        <div className="text-base text-center">
          Feeling Techy enough? Check out the{" "}
          <Link href="/cli" className="italic underline">
            CLI version
          </Link>{" "}
          of my portfolio.
        </div>
      </>
    );
}