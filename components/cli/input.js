"use client";
import React from "react";
import ReactDOM from "react-dom";
import CliHelp from "./help";
import CliAbout from "./about";
import CliContact from "./contact";
import Cli404 from "./c404";
import CliProjects from "./projects";
import CliSkills from "./skills";
import Neofetch from "./neofetch";
import CliEdu from "./education";
import CliSudo from "./sudo";

export default function CLIInput() {
  function cli_input(e) {
    if (e.key == "Enter") {
      var input = e.target.value.toLowerCase();
      document.getElementById("in").setAttribute("disabled", "true");
      document.getElementById("in").setAttribute("value", input);
      document.getElementById("in").setAttribute("id", "inactive");
      var cli_body = document.getElementById("cli_body");
      var new_div = document.createElement("div");
      if (input == "help") {
        ReactDOM.render(<CliHelp />, new_div);
      } else if (input == "about") {
        ReactDOM.render(<CliAbout />, new_div);
      } else if (input == "contact") {
        ReactDOM.render(<CliContact />, new_div);
      } else if (input == "projects") {
        ReactDOM.render(<CliProjects />, new_div);
      } else if (input == "skills") {
        ReactDOM.render(<CliSkills />, new_div);
      } else if (input == "education") {
        ReactDOM.render(<CliEdu />, new_div);
      } else if (input == "experience") {
        console.log("experience");
      } else if (input == "clear") {
        cli_body.innerHTML = "";
        console.log("clear");
      } else if (input.startsWith("sudo")) {
        ReactDOM.render(<CliSudo />, new_div);
      } else if (input == "neofetch") {
        ReactDOM.render(<Neofetch />, new_div);
      }
      else {
        ReactDOM.render(<Cli404 />, new_div);
        console.log("default");
      }

      cli_body.append(new_div);
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
        <code className="mr-5" style={{"lineHeight":1, "margin": 0, "padding": 0}}>╭rachit @ portfolio ⎯⎯</code><br/>╰λ  
        <code>
        <span style={{"lineHeight":1, "margin": 0}}></span>
          <input
            type="text"
            className="bg-transparent text-base-content outline-none ml-3"
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
