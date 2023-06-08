import TypeIt from "typeit-react";

export default function CliHelp() {
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
          Available commands: help, about, contact, projects, education, skills, clear
        </TypeIt>
      </pre>
    </div>
  );
}
