import React from "react";
import Menu from "./Menu";

export default function Settings({
  show,
  difficulty,
  handleEasy,
  handleNormal,
  handleHard,
  easy,
  normal,
  hard,
  gameMode,
  classic,
  contra,
  inverse,
  closeSettings,
}) {
  return (
    <Menu
      show={show}
      mainClass={"settingsMenu"}
      content={
        <div className="settingsContent flex flex-col justify-center items-center">
          <h2 className="text-2xl mb-8 sm:text-4xl sm:px-6 sm:py-4">
            Configuración
          </h2>
          <section className="md:flex md:justify-center md:items-center">
            <div className="dificultad flex flex-col items-center md:mx-10">
              <h2 className="text-xl px-3 sm:text-3xl sm:px-4 bg-violet-500/50 rounded-full">
                Dificultad
              </h2>
              <section className="difficSelection py-4 sm:pt-6 md:pt-4 md:pb-0 sm:text-xl md:flex md:flex-col md:items-center">
                <button
                  className={`px-2 md:mb-3 md:py-1 ${
                    difficulty == easy
                      ? "bg-green-700 rounded-full"
                      : "hover:text-green-500"
                  }`}
                  onClick={handleEasy}
                >
                  Fácil
                </button>
                <button
                  className={`px-2 mx-2 md:mb-3 md:py-1 ${
                    difficulty == normal
                      ? "bg-orange-600 rounded-full"
                      : "hover:text-orange-500"
                  }`}
                  onClick={handleNormal}
                >
                  Normal
                </button>
                <button
                  className={`px-2 md:mb-3 md:py-1 ${
                    difficulty == hard
                      ? "bg-red-700 rounded-full"
                      : "hover:text-red-500"
                  }`}
                  onClick={handleHard}
                >
                  Difícil
                </button>
              </section>
            </div>
            <div className="modos flex flex-col items-center md:mx-10">
              <h2 className="text-xl px-3 mt-4 md:my-0 sm:text-3xl sm:px-4 sm:mt-6 sm:mb-2 bg-violet-500/50 rounded-full">
                Modos de Juego
              </h2>
              <section className="modeSelection flex flex-col pt-4 sm:text-xl">
                <button
                  className={`py-1 mb-3 ${
                    gameMode == "clasico" ? "bg-sky-600/50 rounded-full" : ""
                  }`}
                  onClick={classic}
                >
                  Clásico
                </button>
                <button
                  className={`py-1 mb-3 ${
                    gameMode == "contra"
                      ? "bg-sky-600/50 rounded-full px-4"
                      : ""
                  }`}
                  onClick={contra}
                >
                  Contrarreloj
                </button>
                <button
                  className={`py-1 mb-3 ${
                    gameMode == "inverso" ? "bg-sky-600/50 rounded-full" : ""
                  }`}
                  onClick={inverse}
                >
                  Inverso
                </button>
              </section>
            </div>
          </section>
          <button
            className="border-2 border-emerald-500 rounded-full p-3 px-10 mt-5 hover:bg-emerald-600/50"
            onClick={closeSettings}
          >
            Aceptar
          </button>
        </div>
      }
    />
  );
}
