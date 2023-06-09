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
import CliSudoSu from "./sudosu";
import CliBase from "./base";

try {
  var audio = new Audio("/audio.mp3");
  var playing = false;
} catch (e) {
  console.log(e);
}

function playAudio() {
  if (playing == false) {
    audio.play();
    playing = true;
  }
}
function pauseAudio() {
  if (playing == true) {
    audio.pause();
    playing = false;
  }
}

var input_history = [];
var current_position = 0;
function cli_input(e) {
  if (e.key == "Enter") {
    var input = e.target.value.toLowerCase();
    document.getElementById("in").setAttribute("disabled", "true");
    document.getElementById("in").setAttribute("value", input);
    document.getElementById("in").setAttribute("id", "inactive");
    var cli_body = document.getElementById("cli_body");
    var new_div = document.createElement("div");
    input_history.push(input);
    console.log(input_history);
    current_position = input_history.length - 1;
    if (input == "help" || input == "h" || input == "ls" || input == "man") {
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
    } else if (input == "exit") {
      window.location.href = "/";
    } else if (input.startsWith("sudo rm -rf")) {
      console.log("sudo rm -rf");
      if (confirm("Are you sure you want to delete everything?")) {
        if (confirm("Are you really sure?")) {
          if (confirm("Are you really really sure?")) {
            if (confirm("Are you really really really sure?")) {
              if (confirm("Are you really really really really sure?")) {
                if (
                  confirm("Are you really really really really really sure?")
                ) {
                  if (
                    confirm(
                      "Are you really really really really really really sure?"
                    )
                  ) {
                    alert("Sorry, I can't let you do that.");
                  }
                }
              }
            }
          }
        }
      }
    } else if (input.startsWith("kill")) {
      ReactDOM.render(
        <CliBase text="Don't be a killer!!! Everything has feelings..." />,
        new_div
      );
    } else if (input.startsWith("echo")) {
      ReactDOM.render(
        <CliBase text="I'm not a parrot, I won't repeat what you say..." />,
        new_div
      );
    } else if (input.startsWith("cat")) {
      ReactDOM.render(
        <CliBase text="I'm not a cat, I won't meow..." />,
        new_div
      );
    } else if (input.startsWith("rm")) {
      ReactDOM.render(
        <CliBase text="I'm not a garbage collector, I won't delete your files..." />,
        new_div
      );
    } else if (input.startsWith("mv")) {
      ReactDOM.render(
        <CliBase text="I'm not a mover, I won't move your files..." />,
        new_div
      );
    } else if (input.startsWith("cp")) {
      ReactDOM.render(
        <CliBase text="I'm not a xerox machine, I won't copy your files..." />,
        new_div
      );
    } else if (input.startsWith("mkdir")) {
      ReactDOM.render(
        <CliBase text="I'm not a clerk, I won't create a folder for you..." />,
        new_div
      );
    } else if (input.startsWith("touch")) {
      ReactDOM.render(
        <CliBase text="I respect your privacy, I won't touch your files..." />,
        new_div
      );
    } else if (input.startsWith("chmod")) {
      ReactDOM.render(
        <CliBase text="I'm not a hacker, I won't change your file permissions..." />,
        new_div
      );
    } else if (input.startsWith("chown")) {
      ReactDOM.render(
        <CliBase text="I'm not a hacker, I won't change your file ownership..." />,
        new_div
      );
    } else if (input.startsWith("chgrp")) {
      ReactDOM.render(
        <CliBase text="I'm not a hacker, I won't change your file group ownership..." />,
        new_div
      );
    } else if (input.startsWith("ln")) {
      ReactDOM.render(
        <CliBase text="I'm not a hacker, I won't create a link for you..." />,
        new_div
      );
    } else if (input.startsWith("grep")) {
      ReactDOM.render(
        <CliBase text="I'm not a detective, I won't search for a pattern in your files..." />,
        new_div
      );
    } else if (input.startsWith("find")) {
      ReactDOM.render(
        <CliBase text="I'm not a detective, I won't find your files..." />,
        new_div
      );
    } else if (input.startsWith("locate")) {
      ReactDOM.render(
        <CliBase text="I'm not a detective, I won't locate your files..." />,
        new_div
      );
    } else if (input.startsWith("cd")) {
      ReactDOM.render(
        <CliBase text="I'm not a navigator, I won't change your directory..." />,
        new_div
      );
    } else if (input == "sudo su") {
      ReactDOM.render(<CliSudoSu />, new_div);
      playAudio();
    } else if (input == "st0p") {
      pauseAudio();
    } else if (input.startsWith("sudo")) {
      ReactDOM.render(<CliSudo />, new_div);
    } else if (input == "neofetch") {
      ReactDOM.render(<Neofetch />, new_div);
    } else {
      ReactDOM.render(<Cli404 />, new_div);
      console.log("default");
    }

    cli_body.append(new_div);
    var new_div = document.createElement("div");
    ReactDOM.render(<CLIInput />, new_div);
    cli_body.append(new_div);
    var new_input = document.getElementById("in");
    new_input.focus();
  } else if (e.key == "ArrowUp") {
    e.preventDefault();
    var new_input = document.getElementById("in");
    if (input_history.length > 0) {
      new_input.setAttribute("value", input_history[current_position]);
      if (current_position > 0) {
        current_position = current_position - 1;
      }
    }
  } else if (e.key == "ArrowDown") {
    e.preventDefault();
    var new_input = document.getElementById("in");
    if (input_history.length > 0) {
      if (input_history[current_position + 1] == undefined) {
        new_input.setAttribute("value", "");
      } else {
        new_input.setAttribute("value", input_history[current_position + 1]);
      }
      if (current_position < input_history.length - 1) {
        current_position = current_position + 1;
      }
    }
  }
}

export default function CLIInput() {
  return (
    <div>
      <pre data-prefix="rachit@fedora$" className="text-success ml-3">
        <code className="mr-5" style={{ lineHeight: 1, margin: 0, padding: 0 }}>
          ╭rachit @ portfolio ⎯⎯
        </code>
        <br />
        ╰λ
        <code>
          <span style={{ lineHeight: 1, margin: 0 }}></span>
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
