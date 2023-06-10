import React, { useEffect, useState } from "react";
import { Client, Databases } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("64707ef1e67c12fddb64");

const databases = new Databases(client);

async function fetchProjects() {
  try {
    const response = await databases.listDocuments(
      "6470807cdd27a6f8e517",
      "6470808879eedd132bb6"
    );
    return response.documents;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default function CliProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data);
    });
  }, []);

  return (
    <div className="flex flex-wrap max-w-full">
      <pre
        data-prefix="rachit@fedora$"
        className="text-info ml-3 text-wrap w-full flex flex-wrap"
        style={{ "text-wrap": "wrap" }}
      >
        <div className="lg:flex">
          <div
            className="text-info"
            options={{
              speed: 5,
              waitUntilVisible: true,
              cursor: false,
            }}
          >
            {projects.map((project) => (
              <div key={project.name} style={{"line-height":"50%"}} className="mb-2">
                <span className="text-lg text-success">{project.name}</span>
                <br />
                <span className="text-base">{project.description}</span>
                <br />
                <span className="text-base text-warning">Tech Stack:</span>
                <br />
                {project.Tech_stack.map((tech) => (
                  <span className="text-base" key={tech}>
                    {" "}
                    {tech}
                  </span>
                ))}

                <div>
                  {project.GitHub && (
                    <a
                      className="text-base underline"
                      href={project.GitHub}
                      target="_blank"
                    >
                      GitHub
                    </a>
                  )} {""}
                  {project.URL && (
                    <a
                      className="text-base underline"
                      href={project.URL}
                      target="_blank"
                    >
                      URL
                    </a>
                  )}
                </div>
                <hr className="mt-2 border border-success"/>
              </div>
            ))}
            <span className="text-success text-base">For all projects, visit my GitHub profile: <a href="https://github.com/notnotrachit" className="text-info">github.com/notnotrachit</a></span>
          </div>
        </div>
      </pre>
    </div>
  );
}
