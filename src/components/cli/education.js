import TypeIt from "typeit-react";

export default function CliEdu() {
  return (
    <div className="flex flex-wrap max-w-full">
      <pre
        data-prefix="rachit@fedora$"
        className="text-neutral-content ml-3 text-wrap w-full flex flex-wrap"
        style={{ "text-wrap": "wrap" }}
      >
          <div className="text-base" 
                    options={{
                      speed: 5,
                      waitUntilVisible: true,
                      cursor: false,
                    }}
          >
          <span className="text-base font-semibold text-success"> Schooling: </span><br/>
          <span className="text-base text-info"> {" "} Apeejay School Noida</span><br/>
          <span className="text-base"> {" "} 2008-2020</span><br/>
          <span className="text-base"> {" "} Nursery - Class X </span><br/>
          {/* <span className="text-base"> {" "} Class X Boards - 90.2% </span><br/> */}
          <span className="text-base text-info"> {" "} Sardar Patel Vidyalaya </span><br/>
          <span className="text-base"> {" "} 2020-2022</span><br/>
          <span className="text-base"> {" "} Class XI - Class XII </span><br/>
          {/* <span className="text-base"> {" "} Class XII Boards - 84.8% </span><br/> */}
          <span className="text-base font-semibold text-success"> College: </span><br/>
          <span className="text-base text-info"> {" "} Bennett University </span><br/>
          <span className="text-base"> {" "} 2022-2026</span><br/>
          <span className="text-base"> {" "} B.Tech. Computer Science </span><br/>
          <span className="text-base"> {" "} (Ongoing) </span><br/>
        </div>
      </pre>
    </div>
  );
}
