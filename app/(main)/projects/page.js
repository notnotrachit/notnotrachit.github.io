import { ProjectCards } from "@/components/cards";
import ProjectCard from "@/components/project";
// import { Client, Databases } from "appwrite";
// const client = new Client();

// client
//   .setEndpoint("https://cloud.appwrite.io/v1")
//   .setProject("64707ef1e67c12fddb64");

// const databases = new Databases(client);
// const promise = databases.listDocuments(
//   "6470807cdd27a6f8e517",
//   "6470808879eedd132bb6"
// );
// promise.then(
//   function (response) {
//     console.log(response);
//   },
//   function (error) {
//     console.log(error);
//   }
// );



export default async function projects() {
  // const all_projects = await promise;
  return (
    <main className="">
      <div className="flex justify-center" data-aos="zoom-in">
        <div className="text-5xl font-bold py-5">Projects</div>
      </div>
      <ProjectCards />
      <div className="flex justify-center w-full">      
        {/* <div className="flex flex-wrap justify-center mx-5 gap-y-8 lg:gap-y-16 gap-x-8">
          {(await promise).documents.map((project) => (
            <ProjectCard
              key={project.name}
              name={project.name}
              description={project.description}
              long_description={project.long_description}
              techs={project.Tech_stack}
              image_url={project.image_url}
              live_url={project.URL}
              allow_embed={project.allow_embed}
              github_url={project.GitHub}
              image_name={project.image_name}
            />
          ))}
        </div> */}
      </div>
      <div className="flex justify-center py-10"><a href="https://github.com/notnotrachit"><button className="btn btn-primary">See all other projects at my Github</button></a></div>
    </main>
  );
}