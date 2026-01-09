"use client";
import GitHubCalendar from "react-github-calendar";

export default function Github_Graph() {
  return (
    <div className="flex justify-center my-2 mb-8 lg:mb-2">
      <div className="w-full m-2 lg:m-0 lg:w-3/4">
        <span className="font-bold text-xl flex w-full justify-center">Git Graph</span>
        <GitHubCalendar
          username="notnotrachit"
          blockSize={15}
          blockMargin={5}
          blockRadius={20}
          fontSize={16}
          fullYear={true}
          hideColorLegend={true}
          theme={{
            dark: ['#0e3445', '#1d688a', '#2684ad', '#2fa3d6', '#38BDF8'],
          }}
        />
      </div>
    </div>
  );
}
