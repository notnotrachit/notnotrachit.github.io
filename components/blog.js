import Image from "next/image";
export default function BlogCard(props) {
  return (
    <div className="card w-96 bg-neutral shadow-xl border border-primary">
    {props.cover_image ? (
      <figure className="px-10 pt-10">
        <Image
          src={props.cover_image}
          alt="Cover_image"
          className="rounded-xl border border-primary/50"
          width={300}
          height={200}
        />
      </figure>):
      (
        <figure className="px-10 pt-10">
        <Image
          src={"https://render.duply.co/query/4fTjAk0l7efwnMR/image.jpg?title=" + props.title}
          alt="Cover_image"
          className="rounded-xl"
          width={300}
          height={200}
        />
      </figure>)
      }
      <div className="card-body items-center text-center">
        <h2 className="card-title">{props.title}</h2>
        <p>{props.description}</p>
        <div className="card-actions">
          <a className="bg-primary rounded-xl px-4 py-2 hover:bg-inherit hover:border-primary hover:border hover:scale-110 transition-all ease-in-out" href={props.url} target="_blank">Read</a>
        </div>
      </div>
    </div>
  );
}
