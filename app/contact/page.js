import { FaLinkedin, FaTwitter, FaMastodon } from "react-icons/fa";

export default async function contact() {
  return (
    <main data-aos="zoom-in">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-center">
            <h1 className="text-5xl font-bold">Contact Me!</h1>
            <p className="py-6 text-center">
              You can send a message to me using this form.
              <br /> I will get back to you as soon as possible.
              <br />
              OR <br />
              You can contact me on my socials as well.
            </p>
            <div className="flex justify-center">
              <div className="flex lg:flex-row gap-4">
                <a
                  href="https://www.linkedin.com/in/rachitkhurana1/"
                  target="_blank"
                >
                  <FaLinkedin className="text-3xl text-[#0077b5]" />
                </a>
                <a href="https://twitter.com/notnotrachit" target="_blank">
                  <FaTwitter className="text-3xl text-[#1DA1F2]" />
                </a>
                <a href="https://mastodon.social/@notnotrachit" target="_blank">
                  <FaMastodon className="text-3xl text-[#6364FF]" />
                </a>
              </div>
            </div>
          </div>
          <div className="card w-full max-w-sm shadow-2xl bg-base-100 border border-primary">
            <div className="card-body">
              <form id="contact" action="https://data.endpoint.space/cli98kcmn002108mjpyeeasp9" method="POST">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="your name"
                    name="name"
                    className="input input-bordered border-primary"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="email"
                    name="email"
                    className="input input-bordered border-primary"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea
                    type="textarea"
                    placeholder="enter your message"
                    name="message"
                    className="input textarea h-24 input-bordered border-primary"
                  />
                </div>
                <div className="form-control mt-6">
                  <input type="submit" className="btn btn-primary" value="Send Message" name="submit"/>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
