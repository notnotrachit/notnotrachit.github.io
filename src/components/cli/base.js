export default function CliBase(props) {
  return (
    <div className="flex flex-wrap max-w-full">
      <pre
        data-prefix="rachit@fedora$"
        className="text-neutral-content ml-3 text-wrap w-full flex flex-wrap"
        style={{ "text-wrap": "wrap" }}
      >
        <div className="text-base text-info">
          <span className="text-xl text-warning">{props.text}</span>
        </div>
      </pre>
    </div>
  );
}
