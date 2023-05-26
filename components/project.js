import Image from "next/image";
export default function ProjectCard(props) {
  return (
    <div className="card w-96 bg-neutral shadow-xl" data-aos="fade-up">
      <figure>
        <Image
          src="https://picsum.photos/300/200"
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
        <div className="modal">
        <div className="modal-box relative">
            <label htmlFor={props.name} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 className="text-lg font-bold">{props.name}</h3>
            <p className="py-4">A longer description here</p>
        </div>
        </div>
    </div>
  );
}
