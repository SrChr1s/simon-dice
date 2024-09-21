import React from "react";
import UIMenu from "./UIMenu";

export default function UILost({ show, handleLost }) {
  return (
    <UIMenu
      show={show}
      mainClass={"lostMenu"}
      content={
        <div className="lostContent flex flex-col justify-center items-center">
          <h2 className="text-4xl sm:text-5xl md:text-9xl">PERDISTE</h2>
          <button
            className="border-2 border-emerald-500 rounded-full p-3 px-10 mt-5 hover:bg-emerald-600/50"
            onClick={handleLost}
          >
            Aceptar
          </button>
        </div>
      }
    />
  );
}
