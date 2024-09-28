import React, { useEffect, useState } from "react";
import { HiCog, HiReply, HiOutlineHeart } from "react-icons/hi";
import { useCountDown } from "@raddix/use-count-down";
import Flag from "react-world-flags";
import GameButton from "./components/GameButton";
import Button from "./components/ui/Button";
import Settings from "./components/ui/Settings";
import Lost from "./components/ui/Lost";
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
  const [iTime, setITime] = useState(30);

  const [count, actions] = useCountDown(iTime * 1000, {
    autoStart: false,
    interval: 800,
    onFinished: () => setLost(true),
  });

  const handleStartGame = () => {
    setIsStarted(true);
    if (gameMode === "contra") {
      actions.start();
    }
  };

  const handleLost = () => {
    actions.stop();
    actions.reset();
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
        setITime(30);
        break;
      case "normal":
        setDifficulty(normal);
        setITime(20);
        break;
      case "hard":
        setDifficulty(hard);
        setITime(10);
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

  const handleUserTurn = async (c) => {
    if (userTurn && !lost) {
      const userTry = [...userSecuence];
      const lastColor = userTry.shift();

      setFlash(c);

      if (c == lastColor) {
        if (userTry.length) {
          setUserSecuence(userTry);
        } else {
          if (gameMode === "contra") {
            actions.start(count + 2000);
          }
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
    }
  };

  useEffect(() => {
    if (isStarted && !userTurn) {
      const randomColor = colors[Math.floor(Math.random() * 4)];
      secuence.push(randomColor);
      flashColors(difficulty);
    }
  }, [isStarted, userTurn]);

  async function flashColors(d) {
    actions.stop();
    await Timeout(1000);
    for (let i = 0; i < secuence.length; i++) {
      const e = secuence[i];
      setFlash(e);
      await Timeout(d);
      setFlash("");
      await Timeout(d);
    }
    const tempSecuence = [...secuence];
    if (gameMode === "inverso") {
      setUserSecuence(tempSecuence.reverse());
    } else {
      setUserSecuence(tempSecuence);
    }
    if (gameMode === "contra") {
      actions.start();
    }
    setUserTurn(true);
  }

  return (
    <main className="app text-slate-300 text-base sm:text-2xl md:text-3xl w-screen h-screen flex justify-center items-center bg-gradient-to-bl from-sky-900/40 to-violet-900/40">
      <h1 className="absolute top-16 sm:top-8 md:top-2 md:text-xl flex">
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
      {gameMode == "contra" && isStarted ? (
        <h2 className="absolute top-[106px] sm:top-20 md:top-12">
          Time Left: {Math.floor(count / 60000)}:{Math.floor(count / 1000)}
        </h2>
      ) : null}
      <section className="game grid grid-cols-2 rounded-full border-[6px] sm:border-8 md:border-[12px] border-violet-500/25 bg-neutral-900 p-[6px] sm:p-2 justify-items-center items-center relative">
        {colors.map((c, i) => (
          <GameButton
            key={i}
            bgColor={flash == c ? btnFlash[i] : btnColors[i]}
            bdRadius={btnRadius[i]}
            onClick={() => handleUserTurn(c)}
            clickable={(isStarted || !isStarted) && userTurn}
          />
        ))}
        <button
          className={`playBtn absolute text-black bg-slate-300 size-16 sm:size-24 md:size-32 rounded-full border-[6px] sm:border-8 md:border-[12px] border-neutral-900 hover:scale-100 ${
            isStarted
              ? "text-2xl sm:text-3xl md:text-4xl hover:bg-slate-300 hover:text-black"
              : "text-sm sm:text-xl md:text-2xl hover:bg-violet-500 hover:text-white"
          }`}
          onClick={handleStartGame}
          disabled={isStarted}
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
        <Button
          mainClass={"settingsBtn"}
          icon={<HiCog className={btnIconProps} />}
          position={"bottom-3 right-3"}
          onClick={handleSettings}
        />
      ) : null}

      <Settings
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

      <Lost show={lost} handleLost={handleLost} />

      {isStarted && userTurn && !lost ? (
        <Button
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
