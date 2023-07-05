import ExperienceCard from "@/components/experience";

import { Client, Databases } from "appwrite";
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("64707ef1e67c12fddb64");

const databases = new Databases(client);
const promise = databases.listDocuments(
  "6474519b6c3ffd5722ce",
  "647452837382db479afc"
);
promise.then(
  function (response) {
    console.log("Got certificates");
  },
  function (error) {
    console.log(error);
  }
);

export default async function Education() {
  return (
    <div className="justify-center py-2 mb-8 lg:mb-5 bg-base-100">
      <div className="w-full">
        <div className="flex justify-center w-screen" data-aos="zoom-in">
          <h1 className="text-5xl font-bold">Experience</h1>
        </div>
      </div>
      <div className="flex justify-center mt-5 ml-12 lg:ml-0">
        <ExperienceCard />
      </div>
      <div className="flex justify-center mt-5"></div>
    </div>
  );
}
