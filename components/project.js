"use client";
import Image from "next/image";
export default function ProjectCard(props) {
    function swap_live(name) {
        const swap = document.getElementById(name + "swap");
        swap.classList.toggle("swap-active");
    }

  return (
    <div className="card w-96 bg-neutral shadow-xl" data-aos="fade-up">
      <figure>
        <Image
          src={props.image_url}
          alt="random"
          width={300}
          height={200}
          className="mt-8 rounded-xl"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.name}</h2>
        <p>{props.description}</p>
        <div className="card-actions justify-end">
          {props.techs &&
            props.techs.map((tech) => (
              <div className="badge badge-outline" key={tech}>
                {tech}
              </div>
            ))}
        </div>
        {/* <button className="btn btn-primary mt-2">View Project</button> */}
        <label htmlFor={props.name} className="btn btn-primary mt-2">
          View Project
        </label>
      </div>
      <input type="checkbox" id={props.name} className="modal-toggle" />
      <div className="modal w-[98%] lg:w-full">
        <div className="relative border border-primary bg-neutral p-1 lg:p-5 rounded-xl w-full lg:w-1/2">
          <label
            htmlFor={props.name}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{props.name}</h3>
          <label className="swap text-6xl" id={props.name+"swap"}>
            <div className="flex justify-center group swap-off">
              <div className="grid grid-cols-1 grid-rows-1">
                <Image
                  src={props.image_url}
                  alt="project_image"
                  width={1000}
                  height={800}
                  className="place-self-center lg:w-5/6 p-2 group-hover:blur-sm transition-all ease-in-out rounded-xl row-start-1 row-end-1 col-start-1 col-end-1 z-[5] group-hover:z-[2]"
                  style={{
                    '-ms-zoom': 0.75,
                    '-moz-transform': 0.75,
                    '-moz-transform-origin': 0,
                    '-o-transform': 0.75,
                    '-o-transform-origin': 0,
                    '-webkit-transform': 0.75,
                    '-webkit-transform-origin': 0,
                  }}
                />
                <div className="grid content-center justify-center row-start-1 row-end-1 col-start-1 col-end-1 h-full z-[4]">
                  <button className="btn btn-primary bg-neutral/30 backdrop-blur-xl text-primary hover:text-neutral" onClick={() => swap_live(props.name)}>
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
                <button className="justify-self-start my-1 btn btn-primary bg-neutral/30 backdrop-blur-xl text-primary hover:text-neutral" onClick={() => swap_live(props.name)}>Back</button>
                <div className="justify-self-center text-sm px-8 text-center">
                The preview might look a bit weird inside the iFrame, but it should look fine when you open the project in a new tab.
              </div>
              <a className="justify-self-end my-1 btn btn-primary bg-neutral/30 backdrop-blur-xl text-primary hover:text-neutral" href={props.live_url}>Preview</a>
              </div>

            </div>
          </label>
          <p className="pt-16 pb-4">{props.long_description}</p>
          {props.techs &&
            props.techs.map((tech) => (
              <div className="badge badge-outline mx-1" key={tech}>
                {tech}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
