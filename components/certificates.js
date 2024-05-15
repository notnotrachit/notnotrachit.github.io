import Image from "next/image";
export default function Certificates(props) {
  const date = new Date(props.issued_on);
  const date_string = date.toDateString().split(" ").slice(1).join(" ");
  return (
    <div className="card w-80 bg-neutral shadow-xl" data-aos="zoom-in-up">
      <figure>
        {props.image_name ? (
          <Image
            src={"/certifications/" + props.image_name}
            alt="random"
            width={400}
            height={400}
            className="object-cover w-full h-52 rounded-t-lg"
          />
        ) : (
          <Image
            src={props.image_url}
            alt="random"
            width={400}
            height={400}
            className="object-cover w-full h-52 rounded-t-lg"
          />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.name}</h2>
        <p class="text-neutral-content text-wrap break-words">
          Credential Id: {props.credetial_id}
          <br />
          Issued on: {date_string}
          <br />
          Issued By: {props.issuing_authority}
        </p>

        <div className="card-actions justify-center">
          <a href={props.credential_url} target="_blank">
            <div className="btn btn-primary">View Certificate</div>
          </a>
        </div>
      </div>
    </div>
  );
}
