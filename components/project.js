import Image from "next/image";
export default function ProjectCard(props) {
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
        {props.techs && props.techs.map((tech) => (
            <div className="badge badge-outline" key={tech}>
              {tech}
            </div>
          ))}
        </div>
        {/* <button className="btn btn-primary mt-2">View Project</button> */}
        <label htmlFor={props.name} className="btn btn-primary mt-2">View Project</label>
      </div>
      <input type="checkbox" id={props.name} className="modal-toggle" />
        <div className="modal w-[98%] lg:w-full">
        <div className="relative border border-primary bg-neutral p-1 lg:p-5 rounded-xl w-full lg:w-1/2">
            <label htmlFor={props.name} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 className="text-lg font-bold">{props.name}</h3>
            <div className="flex justify-center">
                <Image
                src={props.image_url}
                alt="project_image"
                width={1000}
                height={800}
                className="rounded-xl lg:w-5/6 p-2"
                />
            </div>
            <p className="py-4">{props.long_description}</p>
            {props.techs && props.techs.map((tech) => (
            <div className="badge badge-outline mx-1" key={tech}>
              {tech}
            </div>
          ))}
        </div>
        </div>
    </div>
  );
}
