import Image from "next/image";

export default function Skills() {
  return (
    <main className="px-8 no-scrollbar">
      <div className="flex justify-center" data-aos="zoom-in">
        <div className="text-4xl font-bold py-5">My Toolbox</div>
      </div>
      <div className="flex justify-center w-full" data-aos="zoom-in-up">
        <h1 className="text-3xl my-4">Languages & Databases</h1>
      </div>
      <div className="flex justify-center" data-aos="zoom-in-up">
        <div className="flex justify-center w-3/4">
          <div className="flex justify-evenly w-full flex-wrap">
            <div className="group cursor-pointer">
              <Image
                src="https://img.icons8.com/color/96/000000/python--v1.png"
                alt="Python"
                width={96}
                height={96}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              />
              <p className="text-center transition-colors duration-300 group-hover:text-primary">Python</p>
            </div>
            <div className="group cursor-pointer">
              <Image
                src="https://img.icons8.com/color/96/000000/javascript--v1.png"
                alt="Javascript"
                width={96}
                height={96}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              />
              <p className="text-center transition-colors duration-300 group-hover:text-primary">JavaScript</p>
            </div>
            <div className="group cursor-pointer">
              <Image
                src="https://img.icons8.com/color/96/000000/java-coffee-cup-logo--v1.png"
                alt="Java"
                width={96}
                height={96}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              />
              <p className="text-center transition-colors duration-300 group-hover:text-primary">Java</p>
            </div>
            <div className="group cursor-pointer">
              <Image
                src="https://img.icons8.com/color/96/000000/golang.png"
                alt="Golang"
                width={96}
                height={96}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              />
              <p className="text-center transition-colors duration-300 group-hover:text-primary">Golang</p>
            </div>
            <div className="group cursor-pointer">
              <Image
                src="https://img.icons8.com/color/96/c-plus-plus-logo.png"
                alt="c++"
                width={96}
                height={96}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              />
              <p className="text-center transition-colors duration-300 group-hover:text-primary">C++</p>
            </div>
            <div className="group cursor-pointer">
              <Image
                src="https://img.icons8.com/color/96/000000/css3.png"
                alt="CSS"
                width={96}
                height={96}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              />
              <p className="text-center transition-colors duration-300 group-hover:text-primary">CSS</p>
            </div>
            <div className="group cursor-pointer">
              <Image
                src="https://img.icons8.com/color/96/000000/html-5--v1.png"
                alt="HTML"
                width={96}
                height={96}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              />
              <p className="text-center transition-colors duration-300 group-hover:text-primary">HTML</p>
            </div>
            <div className="group cursor-pointer">
              <Image
                src="https://img.icons8.com/color/96/000000/mongodb.png"
                alt="MongoDB"
                width={96}
                height={96}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              />
              <p className="text-center transition-colors duration-300 group-hover:text-primary">MongoDB</p>
            </div>
            <div className="group cursor-pointer">
              <Image
                src="https://img.icons8.com/?size=96&id=38561&format=png"
                alt="Postgres"
                width={96}
                height={96}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              />
              <p className="text-center transition-colors duration-300 group-hover:text-primary">Postgres</p>
            </div>
            <div className="group cursor-pointer">
              <Image
                src="https://img.icons8.com/?size=512&id=UFXRpPFebwa2&format=png"
                alt="MySQL"
                width={96}
                height={96}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              />
              <p className="text-center transition-colors duration-300 group-hover:text-primary">MySQL</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full" data-aos="zoom-in-up">
        <h1 className="text-3xl my-4">Frameworks</h1>
      </div>
      <div className="flex justify-center" data-aos="zoom-in-up">
        <div className="flex justify-center w-3/4">
          <div className="flex justify-evenly w-full flex-wrap">
            <div className="group cursor-pointer">
              <Image
                src="https://img.icons8.com/color/96/000000/django.png"
                alt="Django"
                width={96}
                height={96}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              />
              <p className="text-center transition-colors duration-300 group-hover:text-primary">Django</p>
            </div>
            <div className="group cursor-pointer">
              <Image
                src="https://img.icons8.com/96/ffffff/flask"
                alt="Flask"
                width={96}
                height={96}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              />
              <p className="text-center transition-colors duration-300 group-hover:text-primary">Flask</p>
            </div>
            <div className="group cursor-pointer">
              <Image
                src="/skills/fastapi.svg"
                alt="FastAPI"
                width={96}
                height={96}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              />
              <p className="text-center transition-colors duration-300 group-hover:text-primary">FastAPI</p>
            </div>
            <div className="group cursor-pointer">
              <Image
                src="/skills/nextjs.svg"
                alt="Nextjs"
                width={96}
                height={96}
                className="bg-white rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              />
              <p className="text-center transition-colors duration-300 group-hover:text-primary">NextJS</p>
            </div>
            <div>
              <Image
                src="https://img.icons8.com/color/96/react-native.png"
                alt="React"
                width={96}
                height={96}
                className="rounded-full"
              />
              <p className="text-center">ReactJS</p>
            </div>
            <div>
              <Image
                src="https://img.icons8.com/color/96/react-native.png"
                alt="React Native"
                width={96}
                height={96}
                className="rounded-full"
              />
              <p className="text-center">React Native</p>
            </div>
            <div>
              <Image
                src="/skills/tailwind.png"
                alt="TailwindCSS"
                width={96}
                height={96}
                className=""
              />
              <p className="text-center">TailwindCSS</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full" data-aos="zoom-in-up">
        <h1 className="text-3xl my-4">Other tools</h1>
      </div>
      <div className="flex justify-center" data-aos="zoom-in-up">
        <div className="flex justify-center w-3/4">
          <div className="flex justify-evenly w-full flex-wrap">
            <div>
              <Image
                src="https://img.icons8.com/color/96/000000/linux.png"
                alt="Linux"
                width={96}
                height={96}
              />
              <p className="text-center">Linux</p>
            </div>
            <div>
              <Image
                src="https://img.icons8.com/color/96/000000/git.png"
                alt="git"
                width={96}
                height={96}
              />
              <p className="text-center">Git</p>
            </div>
            <div>
              <Image
                src="https://img.icons8.com/color/96/000000/docker.png"
                alt="docker"
                width={96}
                height={96}
              />
              <p className="text-center">Docker</p>
            </div>
            <div>
              <Image
                src="https://img.icons8.com/color/96/000000/github--v1.png"
                alt="github"
                width={96}
                height={96}
              />
              <p className="text-center">GitHub</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
