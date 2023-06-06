"use client";
import React from "react";
import ReactDOM from "react-dom";
import CliHelp from "./help";
import CliAbout from "./about";

export default function CLIInput() {
  function cli_input(e) {
    if (e.key == "Enter") {
      var input = e.target.value;
      document.getElementById("in").setAttribute("disabled", "true");
      document.getElementById("in").setAttribute("value", input);
      document.getElementById("in").setAttribute("id", "inactive");
      var cli_body = document.getElementById("cli_body");
      switch (input) {
        case "help":
          console.log("help");
          var new_div = document.createElement("div");
          ReactDOM.render(<CliHelp />, new_div);
          cli_body.append(new_div);
          break;
        case "about":
          var new_div = document.createElement("div");
          ReactDOM.render(<CliAbout />, new_div);
          cli_body.append(new_div);
          console.log("about");
          break;
        case "contact":
          console.log("contact");
          break;
        case "projects":
          console.log("projects");
          break;
        case "skills":
          console.log("skills");
          break;
        case "education":
          console.log("education");
          break;
        case "experience":
          console.log("experience");
          break;
        case "clear":
          cli_body.innerHTML = "";
          console.log("clear");
          break;
        default:
          console.log("default");
      }
      var new_div = document.createElement("div");
      ReactDOM.render(<CLIInput />, new_div);
      cli_body.append(new_div);
      var new_input = document.getElementById("in");
      new_input.focus();
    }
  }
  return (
    <div>
      <pre data-prefix="rachit@fedora$" className="text-success ml-3">
        <code className="mr-5">rachit@portfolio$</code>
        <code>
          <input
            type="text"
            className="bg-transparent text-base-content outline-none"
            autoFocus
            id="in"
            onKeyDown={cli_input}
            autoComplete="off"
          />
        </code>
      </pre>
    </div>
  );
}
