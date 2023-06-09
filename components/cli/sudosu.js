import Image from "next/image";

export default function CliSudoSu() {
  return (
    <div className="flex flex-wrap max-w-full">
      <pre
        data-prefix="rachit@fedora$"
        className="text-success ml-3 text-wrap w-full"
        style={{ "textWrap": "wrap" }}
        id='sudo_su'
      >
          Access granted.<br/>
          <Image src="https://i.imgur.com/Fs5SUqr.gif" alt="Sudo su" width={320} height={240} />
      </pre>
    </div>
  );
}
