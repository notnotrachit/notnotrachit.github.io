"use client";
import Image from "next/image";
export default function ProjectCard(props) {
  function swap_live(name) {
    const swap = document.getElementById(name + "swap");
    swap.classList.toggle("swap-active");
  }

  return (
    <div
      className="card w-96 bg-neutral text-neutral-content shadow-xl border border-primary"
      data-aos="fade-up"
    >
      <figure>
        {props.image_name ? (
          <Image
            src={"/projects/" + props.image_name}
            alt={props.name}
            width={300}
            height={200}
            className="mt-8 rounded-xl border border-primary/50"
          />
        ) : (
          <Image
            src={props.image_url}
            alt={props.name}
            width={300}
            height={200}
            className="mt-8 rounded-xl border border-primary/50"
          />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.name}</h2>
        <p>{props.description}</p>
        <div className="card-actions justify-start">
          {props.techs &&
            props.techs.map((tech) => (
              <div className="badge badge-outline" key={tech}>
                {tech}
              </div>
            ))}
        </div>
        <label htmlFor={props.name} className="btn btn-primary mt-2">
          View Project
        </label>
      </div>
      <input type="checkbox" id={props.name} className="modal-toggle" />
      <div className="modal w-[98%] lg:w-full transition-all ease-in-out">
        <div className="relative border border-primary bg-neutral p-1 lg:p-5 rounded-xl w-full lg:w-1/2">
          <label
            htmlFor={props.name}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-3xl font-bold text-center">{props.name}</h3>
          {props.allow_embed ? (
            <label className="swap text-6xl" id={props.name + "swap"}>
              <div className="flex justify-center group swap-off">
                <div className="grid grid-cols-1 grid-rows-1">
                  {props.image_name ? (
                    <Image
                      src={"/projects/" + props.image_name}
                      alt="project_image"
                      width={500}
                      height={800}
                      className="place-self-center lg:w-96 p-2 group-hover:blur-sm transition-all ease-in-out rounded-xl row-start-1 row-end-1 col-start-1 col-end-1 z-[5] group-hover:z-[2]"
                    />
                  ) : (
                    <Image
                      src={props.image_url}
                      alt="project_image"
                      width={500}
                      height={800}
                      className="place-self-center lg:w-96 p-2 group-hover:blur-sm transition-all ease-in-out rounded-xl row-start-1 row-end-1 col-start-1 col-end-1 z-[5] group-hover:z-[2]"
                    />
                  )}
                  <div className="lg:grid content-center justify-center row-start-1 row-end-1 col-start-1 col-end-1 h-full z-[4] hidden">
                    <button
                      className="btn btn-primary bg-neutral/30 backdrop-blur-xl text-primary hover:text-neutral hidden lg:block"
                      onClick={() => swap_live(props.name)}
                    >
                      Live preview
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center group swap-on">
                <iframe
                  src={props.live_url}
                  className="w-full h-full rounded-xl z-10"
                  title="Iframe Example"
                  zoom="0.5"
                ></iframe>
                <div className="flex w-full my-2">
                  <button
                    className="justify-self-start my-1 btn btn-primary bg-neutral/30 backdrop-blur-xl text-primary hover:text-neutral"
                    onClick={() => swap_live(props.name)}
                  >
                    Back
                  </button>
                  <div className="justify-self-center text-sm px-8 text-center underline underline-offset-2">
                    The preview might look a bit weird inside the iframe, but it
                    should look fine when you open the project in a new tab.
                  </div>
                  <a
                    className="justify-self-end my-1 btn btn-primary bg-neutral/30 backdrop-blur-xl text-primary hover:text-neutral"
                    href={props.live_url}
                    target="_blank"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </label>
          ) : (
            <div className="flex justify-center">
              {props.image_name ? (
                <Image
                  src={"/projects/" + props.image_name}
                  alt="project_image"
                  width={1000}
                  height={800}
                  className="place-self-center lg:w-[30rem] lg:max-w-96 p-2 group-hover:blur-sm transition-all ease-in-out rounded-xl row-start-1 row-end-1 col-start-1 col-end-1 z-[5] group-hover:z-[2]"
                />
              ) : (
                <Image
                  src={props.image_url}
                  alt="project_image"
                  width={1000}
                  height={800}
                  className="place-self-center lg:w-[30rem] p-2 group-hover:blur-sm transition-all ease-in-out rounded-xl row-start-1 row-end-1 col-start-1 col-end-1 z-[5] group-hover:z-[2]"
                />
              )}
            </div>
          )}

          <p className="pt-4 lg:pt-16 pb-4">{props.long_description}</p>
          <p className="font-bold text-lg">Tech Stack:</p>
          {props.techs &&
            props.techs.map((tech) => (
              <div className="badge badge-outline mx-1" key={tech}>
                {tech}
              </div>
            ))}
          <div className="flex justify-center">
            <div className="btn-group btn-group-horizontal my-2">
              {props.github_url && (
                <a
                  className="btn btn-sm btn-outline"
                  href={props.github_url}
                  target="_blank"
                >
                  GitHub
                </a>
              )}
              {props.live_url && (
                <a
                  className="btn btn-sm btn-outline"
                  href={props.live_url}
                  target="_blank"
                >
                  Preview
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
