import React from "react";

export default function UIMenu({ show, mainClass, content }) {
  return (
    <div
      className={`${
        show ? "visible opacity-100" : "invisible opacity-0"
      } absolute size-full flex justify-center items-center backdrop-blur-xl bg-sky-950/20 duration-500`}
    >
      <section
        className={`${mainClass} size-fit p-8 rounded-3xl text-white  drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)]`}
      >
        {content}
      </section>
    </div>
  );
}
