"use client";
import Draggable from "react-draggable"
import CLIInput from "@/components/cli/input";
import React from "react";
import CliIntro from "@/components/cli/intro";

export default function Page() {


    return (
        <div className="flex bg-base-100 justify-center">
            <Draggable handle="handle">
          <div
            className="absolute bg-neutral pb-5 text-neutral-content rounded-box text-xl w-11/12 mx-2 lg:w-3/4 xl:w-1/2 border-primary/50 border h-2/3 lg:h-5/6"
            id="window"
          >
            <handle className="mb-5">
              <div className="w-full bg-primary/50 rounded-t-box cursor-move flex justify-between px-2 py-1" id="windowheader">
                <div className="flex text-sm align-top">Terminal</div>
              <div className="h-full flex">
                  <div className="avatar placeholder mx-1">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-3">
                      <span className="text-xs"></span>
                    </div>
                  </div>
                  <div className="avatar placeholder mx-1">
                    <div className="bg-warning text-neutral-content rounded-full w-3">
                      <span className="text-xs"></span>
                    </div>
                  </div>
                  <div className="avatar placeholder mx-1">
                    <div className="bg-error text-neutral-content rounded-full w-3">
                      <span className="text-xs"></span>
                    </div>
                  </div>
              </div>
              </div>
            </handle>
            <div id="cli_in">

            </div>
            <div className="py-2 overflow-y-auto h-full">
              <div id="cli_body" className="max-w-full h-full overflow-y-auto">
                <CliIntro />
                <CLIInput />
              </div>
            </div>
          </div>
        </Draggable>
        </div>
    )
}