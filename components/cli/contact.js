import TypeIt from "typeit-react";

export default function CliContact() {
  return (
    <div className="flex flex-wrap max-w-full">
      <pre
        data-prefix="rachit@fedora$"
        className="text-warning ml-3 text-base text-wrap w-full flex flex-wrap"
        style={{ "text-wrap": "wrap" }}
      >
          <TypeIt className="text-base" 
                    options={{
                      speed: 5,
                      waitUntilVisible: true,
                      cursor: false
                    }}
          >
          <span className="text-base"><span className="text-success">Twitter:</span> <a href="https://twitter.com/notnotrachit" target="_blank">@notnotrachit</a></span><br/>
          <span className="text-base"><span className="text-success">GitHub:</span> <a href="https://github.com/notnotrachit" target="_blank">notnotrachit</a></span><br/>
          <span className="text-base"><span className="text-success">LinkedIn:</span> <a href="https://linkedin.com/in/rachitkhurana1" target="_blank">rachitkhurana1</a></span><br/>
          <span className="text-base"><span className="text-success">Instagram:</span> <a href="https://instagram.com/notnotrachit" target="_blank">notnotrachit</a></span><br/>
          <span className="text-base"><span className="text-success">Email:</span> <a href="mailto:notnotrachit@gmail.com" target="_blank">notnotrachit@gmail.com</a></span>
        </TypeIt>
      </pre>
    </div>
  );
}
