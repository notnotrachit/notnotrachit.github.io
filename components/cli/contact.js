import { FaEnvelope, FaEnvelopeOpen, FaEnvelopeOpenText, FaGithub, FaInstagram, FaLinkedin, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import TypeIt from "typeit-react";

export default function CliContact() {
  return (
    <div className="flex flex-wrap max-w-full">
      <pre
        data-prefix="rachit@fedora$"
        className="text-warning ml-3 text-base text-wrap w-full flex flex-wrap"
        style={{ "text-wrap": "wrap" }}
      >
          <div className="text-base" 
          >
          <span className="text-base flex gap-1"><span className="text-success flex"><FaTwitter size={'1rem'} className="mt-1"/> Twitter:</span> <a href="https://twitter.com/notnotrachit" target="_blank">@notnotrachit</a></span>
          <span className="text-base flex gap-1"><span className="text-success flex"><FaGithub size={'1rem'} className="mt-1"/> GitHub:</span> <a href="https://github.com/notnotrachit" target="_blank">notnotrachit</a></span>
          <span className="text-base flex gap-1"><span className="text-success flex"><FaLinkedinIn size={'1rem'} className="mt-1"/> LinkedIn:</span> <a href="https://linkedin.com/in/rachitkhurana1" target="_blank">rachitkhurana1</a></span>
          <span className="text-base flex gap-1"><span className="text-success flex"><FaInstagram size={'1rem'} className="mt-1"/> Instagram:</span> <a href="https://instagram.com/notnotrachit" target="_blank">notnotrachit</a></span>
          <span className="text-base flex gap-1"><span className="text-success flex"><FaEnvelopeOpenText size={'1rem'} className="mt-1"/> Email:</span> <a href="mailto:notnotrachit@gmail.com" target="_blank">notnotrachit@gmail.com</a></span>
        </div>
      </pre>
    </div>
  );
}
