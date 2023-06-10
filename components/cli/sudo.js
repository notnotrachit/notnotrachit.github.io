import TypeIt from "typeit-react";

export default function CliSudo() {
  return (
    <div className="flex flex-wrap max-w-full">
      <pre
        data-prefix="rachit@fedora$"
        className="text-error ml-3 text-wrap w-full flex flex-wrap"
        style={{ "text-wrap": "wrap" }}
      >
          <TypeIt className="text-error"
                    options={{
                      speed: 5,
                      waitUntilVisible: true,
                      cursor: false,
                    }}
          >
          You are not in the sudoers file.<br/> This incident will be reported.<br/>
          Reporting incident ....
          </TypeIt>
      </pre>
    </div>
  );
}
