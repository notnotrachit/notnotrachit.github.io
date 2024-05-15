import Education_Card from "@/components/education";
import Certificates from "@/components/certificates";

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
          <h1 className="text-5xl font-bold">Education</h1>
        </div>
      </div>
      <div className="flex justify-center mt-5 ml-12 lg:ml-0">
        <Education_Card />
      </div>
      <div className="flex justify-center mt-5">
        <div className="">
          <div
            className="flex justify-center w-full text-center"
            data-aos="zoom-in"
          >
            <h1 className="text-5xl font-bold w-full text-center my-5">
              Certifications
            </h1>
          </div>
          <div className="flex flex-wrap justify-center w-full gap-4">
            {(await promise).documents.map((certificate) => (
              <Certificates
                key={certificate.name}
                name={certificate.name}
                credetial_id={certificate.credetial_id}
                credential_url={certificate.credential_url}
                issued_on={certificate.issued_on}
                issuing_authority={certificate.issuing_authority}
                issuing_authority_url={certificate.issuing_authority_url}
                image_url={certificate.image_url}
                image_name={certificate.image_name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
