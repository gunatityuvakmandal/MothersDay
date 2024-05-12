import html2canvas from "html2canvas";
import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Layout1Image from "../../img/mothersday.png";

const CropImage = () => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    aspect: 10 / 10,
    unit: "%",
    x: 0,
    y: 0,
    width: 50,
    height: 50,
  });
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => {
    setShowModal(!showModal);
  };

  const selectImage = (file) => {
    setSrc(URL.createObjectURL(file));
  };

  function downloadImage() {
    html2canvas(document.getElementById("finalImage")).then(function (canvas) {
      var link = document.createElement("a");
      link.download = "download.jpg";
      link.href = canvas.toDataURL("image/jpeg", 1);
      link.click();
    });
  }

  const cropImageNow = () => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Converting to base64
    const base64Image = canvas.toDataURL("image/jpeg");
    setSrc(base64Image);
    setShowModal(false);
  };

  return (
    <div className="m-1 p-1 flex justify-evenly flex-wrap">
      <div
        className="relative"
        id="finalImage"
      >
        {src ? (
          <div className="absolute z-0 pt-40 pl-5">
            <img
              className="object-cover h-44"
              src={src}
            />
          </div>
        ) : (
          <></>
        )}
        <img
          className="z-10 relative h-96"
          src={Layout1Image}
        />
      </div>

      <div className="bg-white my-4 mx-12 p-4 flex flex-col justify-center h-52 w-fit">
        <>
          <input
            type="file"
            accept="image/*"
            onClick={handleOpen}
            onChange={(e) => {
              selectImage(e.target.files[0]);
            }}
            className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-orange-600 
            file:text-white
            hover:file:bg-orange-200 ..."
          />
          <br />
          {showModal ? (
            <>
              <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                      <p className="text-md font=semibold">Crop Image</p>
                      <button
                        className="bg-transparent border-0 text-black float-right"
                        onClick={() => setShowModal(false)}
                      >
                        <span>x</span>
                      </button>
                    </div>
                    <div className="relative p-6 flex-auto">
                      {src && (
                        <div>
                          <ReactCrop
                            src={src}
                            onImageLoaded={setImage}
                            crop={crop}
                            onChange={setCrop}
                          />
                          <br />
                          <br />
                          <br />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-300 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="text-white bg-orange-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={cropImageNow}
                      >
                        Crop
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </>

        <button
          className="bg-orange-600 m-4 px-4 py-2 text-white rounded-full"
          onClick={() => downloadImage()}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default CropImage;
