import React from "react";

export default function Button({ mainClass, position, icon, onClick }) {
  return (
    <button
      className={`${mainClass} absolute bg-neutral-700 size-12 sm:size-20 md:size-32 rounded-2xl sm:rounded-3xl md:rounded-[32px] ${position} flex justify-center items-center`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
