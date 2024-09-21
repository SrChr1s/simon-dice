import React, { useEffect, useState } from "react";
import { HiCog, HiReply, HiOutlineHeart } from "react-icons/hi";
import Flag from "react-world-flags";
import GameButton from "./components/GameButton";
import UIButton from "./components/UIButton";
import UISettings from "./components/UISettings";
import UILost from "./components/UILost";
import Timeout from "./utils/timeout";

const colors = ["yellow", "blue", "red", "green"];

const btnColors = [
  "bg-yellow-500",
  "bg-blue-800",
  "bg-red-800",
  "bg-green-800",
];

const btnFlash = [
  "bg-yellow-300 shadow-[0_0_120px_rgb(227,160,8)]",
  "bg-blue-200 shadow-[0_0_120px_rgb(63,131,248)]",
  "bg-red-200 shadow-[0_0_120px_rgb(224,36,36)]",
  "bg-green-200 shadow-[0_0_120px_rgb(14,159,110)]",
];

const btnRadius = [
  "rounded-tl-full",
  "rounded-tr-full",
  "rounded-bl-full",
  "rounded-br-full",
];

const btnIconProps = "size-9 sm:size-16 md:size-28 text-slate-300";

const easy = 400;
const normal = 300;
const hard = 200;

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [level, setLevel] = useState(0);
  const [secuence, setSecuence] = useState([]);
  const [difficulty, setDifficulty] = useState(easy);
  const [gameMode, setGameMode] = useState("clasico");
  const [flash, setFlash] = useState("");
  const [userTurn, setUserTurn] = useState(false);
  const [userSecuence, setUserSecuence] = useState([]);
  const [lost, setLost] = useState(false);
  const [settings, setSettings] = useState(false);

  const handleStartGame = () => {
    setIsStarted(true);
  };

  const handleLost = () => {
    setIsStarted(false);
    if (level > Number(localStorage.getItem("hscore"))) {
      localStorage.setItem("hscore", level);
    }
    setLevel(0);
    setSecuence([]);
    setUserTurn(false);
    setUserSecuence([]);
    setLost(false);
  };

  const handleBack = () => {
    handleLost();
  };

  const handleSettings = () => {
    if (!settings) {
      setSettings(true);
    } else {
      setSettings(false);
    }
  };

  const handleDiffic = (dS) => {
    switch (dS) {
      case "easy":
        setDifficulty(easy);
        break;
      case "normal":
        setDifficulty(normal);
        break;
      case "hard":
        setDifficulty(hard);
        break;
    }
  };

  const handleGameMode = (mS) => {
    switch (mS) {
      case "c":
        setGameMode("clasico");
        break;
      case "r":
        setGameMode("contra");
        break;
      case "i":
        setGameMode("inverso");
        break;
    }
  };

  const handleUserTurn = (c) => {
    if (userTurn && !lost) {
      switch (gameMode) {
        case "clasico":
          clasicMode(c);
          break;
        case "contra":
          contraMode(c);
          break;
        case "inverso":
          inverseMode(c);
          break;
      }
    }
  };

  const clasicMode = async (c) => {
    const userTry = [...userSecuence];
    const lastColor = userTry.shift();

    setFlash(c);

    if (c == lastColor) {
      if (userTry.length) {
        setUserSecuence(userTry);
      } else {
        await Timeout(300);
        setFlash("");
        setLevel(secuence.length);
        setUserSecuence([]);
        setUserTurn(false);
        setIsStarted(true);
      }
    } else {
      setFlash("");
      setLost(true);
    }
    await Timeout(300);
    setFlash("");
  };

  const contraMode = (c) => {};

  const inverseMode = (c) => {};

  useEffect(() => {
    if (isStarted && !userTurn) {
      const randomColor = colors[Math.floor(Math.random() * 4)];
      secuence.push(randomColor);
      flashColors(difficulty);
    }
  }, [isStarted, userTurn]);

  async function flashColors(d) {
    await Timeout(1000);
    for (let i = 0; i < secuence.length; i++) {
      const e = secuence[i];
      setFlash(e);
      await Timeout(d);
      setFlash("");
      await Timeout(d);
    }
    setUserSecuence([...secuence]);
    setUserTurn(true);
  }

  return (
    <main className="app w-screen h-screen flex justify-center items-center">
      <h1 className="text-slate-300 absolute text-base top-16 sm:text-2xl sm:top-16 md:text-3xl md:top-8 flex">
        Hecho con <HiOutlineHeart className="text-red-600 m-1" /> en
        <span className="text-blue-300 mx-1 bg-blue-400/35 rounded-full px-1">
          Arg
          <span className="text-yellow-200">
            <span className="text-white">e</span>n
            <span className="text-white">t</span>
          </span>
          ina
        </span>
        <Flag code="ar" width="25" className="mx-1" />
      </h1>
      <section className="game grid grid-cols-2 rounded-full border-[6px] sm:border-8 md:border-[12px] border-violet-500/25 p-[6px] sm:p-2 justify-items-center items-center relative">
        {colors.map((c, i) => (
          <GameButton
            key={i}
            bgColor={flash == c ? btnFlash[i] : btnColors[i]}
            bdRadius={btnRadius[i]}
            onClick={() => handleUserTurn(c)}
          />
        ))}
        <button
          className={`playBtn absolute bg-slate-300 size-16 sm:size-24 md:size-32 rounded-full border-[6px] sm:border-8 md:border-[12px] border-neutral-800 hover:scale-100 hover:bg-violet-500 hover:text-white ${
            isStarted
              ? "text-2xl sm:text-3xl md:text-4xl hover:scale-100"
              : "text-sm sm:text-xl md:text-2xl"
          }`}
          onClick={handleStartGame}
        >
          {isStarted ? level + 1 : "JUGAR"}
        </button>
      </section>
      <h2 className="text-slate-300 absolute bottom-20 px-2 sm:text-2xl sm:bottom-16 md:bottom-7">
        High Score:{" "}
        {localStorage.getItem("hscore") != 0
          ? Number(localStorage.getItem("hscore"))
          : 0}
      </h2>
      {!isStarted && !settings ? (
        <UIButton
          mainClass={"settingsBtn"}
          icon={<HiCog className={btnIconProps} />}
          position={"bottom-3 right-3"}
          onClick={handleSettings}
        />
      ) : null}

      <UISettings
        show={settings}
        difficulty={difficulty}
        handleEasy={() => handleDiffic("easy")}
        handleNormal={() => handleDiffic("normal")}
        handleHard={() => handleDiffic("hard")}
        easy={easy}
        normal={normal}
        hard={hard}
        gameMode={gameMode}
        classic={() => handleGameMode("c")}
        contra={() => handleGameMode("r")}
        inverse={() => handleGameMode("i")}
        closeSettings={handleSettings}
      />

      <UILost show={lost} handleLost={handleLost} />

      {isStarted && userTurn && !lost ? (
        <UIButton
          mainClass={"backBtn"}
          icon={<HiReply className={btnIconProps} />}
          position={"bottom-3 left-3"}
          onClick={handleBack}
        />
      ) : null}
    </main>
  );
}

export default App;
