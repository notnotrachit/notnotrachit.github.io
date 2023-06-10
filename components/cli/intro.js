const raw_intro=`

`


export default function CliIntro() {
  return (
    <div className="flex flex-wrap max-w-full">
      <pre
        data-prefix="rachit@fedora$"
        className="text-neutral-content ml-3 text-wrap w-full flex flex-wrap"
        style={{ "text-wrap": "wrap" }}
      >
          <div className="text-base flex justify-center w-full text-success" >
<p className="" style={{'lineHeight':'10px'}}>
╔═══════════════════════════════════════════════════╗<br/>
║                                                   ║<br/>
║                                                   ║<br/>
║  Welcome to Rachit&apos;s Portfolio CLI Terminal       ║<br/>
║                                                   ║<br/>
║  Type <i>help</i> to see a list of commands available    ║<br/>
║                                                   ║<br/>
║                                                   ║<br/>
╚═══════════════════════════════════════════════════╝<br/>
</p>
        </div>
      </pre>
    </div>
  );
}
