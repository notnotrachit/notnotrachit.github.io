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
            <span className="text-lg">Languages & Frameworks:</span>
            <br />
            <div className="flex flex-wrap">
              <span className="flex gap-x-1"><FaPython size={'1rem'} className="mt-1"/>Python | </span>
              <span className="flex gap-x-1"><SiJavascript size={'1rem'} className="mt-1"/>JavaScript | </span>   
              <span className="flex gap-x-1"><FaJava size={'1rem'} className="mt-1"/>Java | </span>
              <span className="flex gap-x-1"><SiHtml5 size={'1rem'} className="mt-1"/>HTML | </span>
              <span className="flex gap-x-1"><SiCss3 size={'1rem'} className="mt-1"/>CSS | </span>
              <span className="flex gap-x-1"><SiMongodb size={'1rem'} className="mt-1"/>MongoDB | </span>
              <span className="flex gap-x-1"><SiPostgresql size={'1rem'} className="mt-1"/>PostgreSQL | </span>
              <span className="flex gap-x-1"><GrMysql size={'1rem'} className="mt-1"/>MySQL</span>
            </div>
            <br />
            <span className="text-lg">Frameworks:</span>
            <br />
            <div className="flex flex-wrap">
              <span className="flex gap-x-1"><SiDjango size={'1rem'} className="mt-1"/>Django | </span>
              <span className="flex gap-x-1"><SiFlask size={'1rem'} className="mt-1"/>Flask | </span>
              <span className="flex gap-x-1"><SiFastapi size={'1rem'} className="mt-1"/>FastAPI | </span>
              <span className="flex gap-x-1"><TbBrandNextjs size={'1rem'} className="mt-1"/>Next.js | </span>
              <span className="flex gap-x-1"><SiTailwindcss size={'1rem'} className="mt-1"/>Tailwind CSS</span>
            </div>
            <br />
            <span className="text-lg">Other Tools:</span>
            <br />
            <div className="flex flex-wrap">
              <span className="flex gap-x-1"><SiLinux size={'1rem'} className="mt-1"/>Linux | </span>
              <span className="flex gap-x-1"><SiFedora size={'1rem'} className="mt-1"/>Fedora | </span>
              <span className="flex gap-x-1"><SiGit size={'1rem'} className="mt-1"/>Git | </span>
              <span className="flex gap-x-1"><SiDocker size={'1rem'} className="mt-1"/>Docker | </span>
              <span className="flex gap-x-1"><SiGithub size={'1rem'} className="mt-1"/>GitHub</span>
            </div>
        </TypeIt>
      </pre>
    </div>
  );
}
