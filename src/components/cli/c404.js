import TypeIt from "typeit-react";

export default function Cli404() {
  return (
    <div className="flex flex-wrap max-w-full">
      <pre
        data-prefix="rachit@fedora$"
        className="ml-3 text-error text-wrap w-full flex flex-wrap"
        style={{ "text-wrap": "wrap" }}
      >
          <div className="text-base" 
                    options={{
                      speed: 5 ,
                      waitUntilVisible: true,
                      cursor: false
                    }}
          >
          404 - Command not found. Enter <code className="italic">help</code> to see available commands.
        </div>
      </pre>
    </div>
  );
}
