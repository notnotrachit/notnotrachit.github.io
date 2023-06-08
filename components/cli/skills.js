import TypeIt from "typeit-react";
import { FaPython, FaJava } from "react-icons/fa";
import { SiJavascript, SiCss3, SiHtml5, SiMongodb, SiPostgresql, SiDjango, SiFlask, SiFastapi, SiTailwindcss, SiLinux, SiFedora, SiGit, SiDocker, SiGithub } from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { TbBrandNextjs } from "react-icons/tb";

export default function CliSkills() {
  return (
    <div className="flex flex-wrap max-w-full">
      <pre
        data-prefix="rachit@fedora$"
        className="text-neutral-content ml-3 text-wrap w-full flex flex-wrap"
        style={{ "text-wrap": "wrap" }}
      >
          <TypeIt className="text-base" 
                    options={{
                      speed: 5,
                      waitUntilVisible: true,
                      cursor: false,
                    }}
          >
            <span className="text-lg text-success">Languages & Frameworks:</span>
            <br />
            <div className="flex flex-wrap">
              <span className="flex gap-x-1"><FaPython size={'1rem'} className="mt-1 text-info"/>Python <span className="text-info">| </span> </span>
              <span className="flex gap-x-1"><SiJavascript size={'1rem'} className="mt-1 text-info"/>JavaScript <span className="text-info">| </span> </span>   
              <span className="flex gap-x-1"><FaJava size={'1rem'} className="mt-1 text-info"/>Java <span className="text-info">| </span> </span>
              <span className="flex gap-x-1"><SiHtml5 size={'1rem'} className="mt-1 text-info"/>HTML <span className="text-info">| </span> </span>
              <span className="flex gap-x-1"><SiCss3 size={'1rem'} className="mt-1 text-info"/>CSS <span className="text-info">| </span> </span>
              <span className="flex gap-x-1"><SiMongodb size={'1rem'} className="mt-1 text-info"/>MongoDB <span className="text-info">| </span> </span>
              <span className="flex gap-x-1"><SiPostgresql size={'1rem'} className="mt-1 text-info"/>PostgreSQL <span className="text-info">| </span> </span>
              <span className="flex gap-x-1"><GrMysql size={'1rem'} className="mt-1 text-info"/>MySQL</span>
            </div>
            <br />
            <span className="text-lg text-success">Frameworks:</span>
            <br />
            <div className="flex flex-wrap">
              <span className="flex gap-x-1"><SiDjango size={'1rem'} className="mt-1 text-info"/>Django <span className="text-info">| </span> </span>
              <span className="flex gap-x-1"><SiFlask size={'1rem'} className="mt-1 text-info"/>Flask <span className="text-info">| </span> </span>
              <span className="flex gap-x-1"><SiFastapi size={'1rem'} className="mt-1 text-info"/>FastAPI <span className="text-info">| </span> </span>
              <span className="flex gap-x-1"><TbBrandNextjs size={'1rem'} className="mt-1 text-info"/>Next.js <span className="text-info">| </span> </span>
              <span className="flex gap-x-1"><SiTailwindcss size={'1rem'} className="mt-1 text-info"/>Tailwind CSS</span>
            </div>
            <br />
            <span className="text-lg text-success">Other Tools:</span>
            <br />
            <div className="flex flex-wrap">
              <span className="flex gap-x-1"><SiLinux size={'1rem'} className="mt-1 text-info"/>Linux <span className="text-info">| </span> </span>
              <span className="flex gap-x-1"><SiFedora size={'1rem'} className="mt-1 text-info"/>Fedora <span className="text-info">| </span> </span>
              <span className="flex gap-x-1"><SiGit size={'1rem'} className="mt-1 text-info"/>Git <span className="text-info">| </span> </span>
              <span className="flex gap-x-1"><SiDocker size={'1rem'} className="mt-1 text-info"/>Docker <span className="text-info">| </span> </span>
              <span className="flex gap-x-1"><SiGithub size={'1rem'} className="mt-1 text-info"/>GitHub</span>
            </div>
        </TypeIt>
      </pre>
    </div>
  );
}
