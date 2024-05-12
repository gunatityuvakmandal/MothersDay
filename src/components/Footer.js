import React from "react";
import YTLogo from "../../img/youtube-logo.svg";

function Footer() {
  return (
    <div className="bg-orange-600 rounded-sm m-3 p-3 flex-col items-center justify-center shadow-2xl">
      <div>
        <p className="text-sm text-white text-center">Gunatit Yuvak Mandal</p>
      </div>
      <div>
        <a href="https://www.youtube.com/@GunatitYuvakMandal">
          <img
            className="h-10 flex-col mx-auto"
            src={YTLogo}
          ></img>
        </a>
      </div>
      <div>
        <p className="text-sm text-white text-center">
          Andheri | Vile Parle | Santacruz
        </p>
      </div>
    </div>
  );
}

export default Footer;
