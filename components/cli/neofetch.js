import TypeIt from "typeit-react";

const raw_img = `
<pre id="tiresult" style="font-size: 9px; line-height: 10px; font-weight: bold; padding: 4px 5px; --fs: 9px;"><b class="text-neutral">0111010010101111111111101111101111111110000110111000001100100111111001</b>
<b class="text-neutral">1100001111110111011010000101111101010110001011001100111111111000011011</b>
<b class="text-neutral">10110110101</b><b class="text-neutral">1</b><b class="text-neutral">1110010111000010010111001010001000111100001111100110000011</b>
<b class="text-neutral">110010110010</b><b class="text-info">010101111010111100101010101101110</b><b class="text-neutral">1100000111100011010011001</b>
<b class="text-neutral">1111000110011</b><b class="text-info">11101011010000111101110010101001101</b><b class="text-neutral">1100101100010001001111</b>
<b class="text-neutral">000001000000111</b><b class="text-info">11111011110001001000101110011100000</b><b class="text-neutral">11001101110001010100</b>
<b class="text-neutral">00010101111010010</b><b class="text-info">1000001100000110111101000000010110</b><b class="text-neutral">0101111000111011100</b>
<b class="text-neutral">01110100100101110100101101001000100100011</b><b class="text-info">0111110011</b><b class="text-neutral">1111111101000100010</b>
<b class="text-neutral">101110001001111000110111111101100110000011</b><b class="text-info">1111100110</b><b class="text-neutral">010011000101110110</b>
<b class="text-neutral">1001101000101101111011111111011111100011100</b><b class="text-info">001100011</b><b class="text-neutral">111101000110111110</b>
<b class="text-neutral">110110110000101111010111110110101111110101</b><b class="text-info">010010100</b><b class="text-neutral">0111011000100010100</b>
<b class="text-neutral">0101100101000000101101011010100100101100</b><b class="text-info">00111000011</b><b class="text-neutral">0001000001111100001</b>
<b class="text-neutral">00110110010011100</b><b class="text-info">10000000011011111110</b><b class="text-neutral">0100</b><b class="text-info">000000110</b><b class="text-neutral">00000111010011100000</b>
<b class="text-neutral">00011001100001010</b><b class="text-info">1011101000101000100101</b><b class="text-neutral">1100</b><b class="text-info">00001</b><b class="text-neutral">1010101101100010010110</b>
<b class="text-neutral">01000001011000000</b><b class="text-info">111000101100111000100011</b><b class="text-neutral">11011110100100111111010001100</b>
<b class="text-neutral">01100001111001111</b><b class="text-info">1010101111100111111111110</b><b class="text-neutral">0010011110111011101100111110</b>
<b class="text-neutral">10000011011010001</b><b class="text-info">10001001</b><b class="text-neutral">10001101</b><b class="text-info">11101001000</b><b class="text-neutral">01011001100011111100010111</b>
<b class="text-neutral">00111001100111101</b><b class="text-info">11101010</b><b class="text-neutral">0010111101</b><b class="text-info">00010001110</b><b class="text-neutral">001000010101110111010111</b>
<b class="text-neutral">01001011110010010</b><b class="text-info">11100001</b><b class="text-neutral">001011101010</b><b class="text-info">1001101100</b><b class="text-neutral">10100101100001111011011</b>
<b class="text-neutral">00011110100101000</b><b class="text-info">10100001</b><b class="text-neutral">0111000101001</b><b class="text-info">10110111111</b><b class="text-neutral">100010011111100011011</b>
<b class="text-neutral">01100000111101000</b><b class="text-info">11111110</b><b class="text-neutral">100101101000101</b><b class="text-info">00001110000</b><b class="text-neutral">1001010110010111100</b>
<b class="text-neutral">11010100100000111</b><b class="text-info">00010110</b><b class="text-neutral">00100011111010110</b><b class="text-info">0000101000</b><b class="text-neutral">100010100100001011</b>
<b class="text-neutral">0110111010011101100010110111111111011101100010010000010101110110110111</b>
<b class="text-neutral">1111100110100000101010111111011110010010111110101011110111111001011010</b>
</pre>
`;

export default function Neofetch() {
  // const platform = navigator.userAgentData.platform || navigator.platform;
  var platform;
  var browser;
  if (navigator.userAgentData) {
    platform = navigator.userAgentData.platform;
    browser = navigator.userAgentData.brands[navigator.userAgentData.brands.length-1];
  } else {
    platform = navigator.platform;
  }
  var RAM;
  if (navigator.deviceMemory) {
    if (navigator.deviceMemory >= 8) {
      RAM = "8 GB or more";
    }
    else{
      RAM = navigator.deviceMemory + " GB";
    }

  } else {
    RAM = undefined;
  }

  var canvas = document.createElement('canvas');
var gl;
var debugInfo;
var vendor_g;
var renderer;
var GPU;
try {
  gl = canvas.getContext('webgl', { powerPreference: "high-performance" }) || canvas.getContext('experimental-webgl', { powerPreference: "high-performance" });} catch (e) {
}

if (gl) {
  debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  vendor_g = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
  renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
  console.log(renderer);
  if (renderer.includes("ANGLE")) {
  GPU=renderer.substr(7, (renderer.length-2));
  } else {
    GPU=renderer;
  }
}

  return (
    <div className="flex flex-wrap max-w-full">
      <pre
        data-prefix="rachit@fedora$"
        className="text-info ml-3 text-wrap w-full flex flex-wrap"
        style={{ "text-wrap": "wrap" }}
      >
        <div className="lg:flex">
          <div>
            <div dangerouslySetInnerHTML={{ __html: raw_img }} />
          </div>
          <TypeIt
            className="text-base"
            options={{
              speed: 5,
              waitUntilVisible: true,
              cursor: false,
            }}
          >
            <span className="text-success">rachit@portfolio</span>
            <br />
            <span className="text-success">_________________</span>
            <br />
            <span className="text-success">OS:</span> Rachit Portfolio OS
            <br />
            <span className="text-success">Your Host System:</span> {platform}
            <br />
            <span className="text-success">Kernel:</span> 251.bnZyIGdvbm5hIGdpdmUgdSB1cA==
            <br />
            {browser && (
              <div>
                <span className="text-success">Browser:</span> {browser.brand}
                <br />
                <span className="text-success">Browser Version:</span> {browser.version}
              </div>
            )}
            <span className="text-success">Resolution:</span> {window.screen.width}<span className="text-success">x</span>{window.screen.height}
            <br />
            <span className="text-success">Your Default Language:</span> {navigator.language}
            <br />
            <span className="text-success">Your Default Timezone:</span> {Intl.DateTimeFormat().resolvedOptions().timeZone}
            <br />
            {RAM && (
              <div>
                <span className="text-success">RAM:</span> {RAM}
                <br />
              </div>
            )}
            <span className="text-success">CPU Cores:</span> {navigator.hardwareConcurrency}
            <br />
            <span className="text-success">GPU being used:</span> {GPU}
          </TypeIt>
        </div>
      </pre>
    </div>
  );
}
