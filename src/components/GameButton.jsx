import React from "react";

export default function GameButton({ bgColor, bdRadius, onClick, clickable }) {
  return (
    <button
      className={`size-24 sm:size-36 md:size-44 m-1 sm:m-1.5 md:m-2 ${bgColor} ${bdRadius} ${
        !clickable ? "hover:scale-100 active:scale-100" : ""
      }`}
      onClick={onClick}
      disabled={!clickable}
    />
  );
}
