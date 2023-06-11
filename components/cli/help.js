export default function CliHelp() {
  return (
    <div className="flex flex-wrap max-w-full">
      <pre
        data-prefix="rachit@fedora$"
        className="text-neutral-content ml-3 text-wrap w-full flex flex-wrap"
        style={{ "text-wrap": "wrap" }}
      >
        <div className="text-base text-info">
          <span className="text-xl text-warning">Available commands:</span>
          <br />
          <div className="flex gap-5">
            <div>
              <span>about</span>
              <br />
              <span>skills</span>
              <br />
              <span>projects</span>
              <br />
              <span>education</span>
              <br />
              <span>contact</span>
              <br />
            </div>
            <div>
              <span>help</span>
              <br />
              <span>neofetch</span>
              <br />
              <span>sudo</span>
              <br />
              <span>sudo su</span>
              <br />
              <span>clear</span>
              <br />
            </div>
          </div>
        </div>
      </pre>
    </div>
  );
}
