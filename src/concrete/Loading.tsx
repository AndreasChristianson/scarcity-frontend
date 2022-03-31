import { Component } from "solid-js";

const Loading: Component = () => (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <rect id="r" width="4" height="20" />
    </defs>
    <use href="#r">
      <animate
        attributeName="opacity"
        values="1; .2; 1"
        begin="0s"
        dur="2s"
        repeatCount="indefinite"
      />
    </use>
    <use href="#r" x="7">
      <animate
        attributeName="opacity"
        values="1; .2; 1"
        begin="0.2s"
        dur="2s"
        repeatCount="indefinite"
      />
    </use>
    <use href="#r" x="14">
      <animate
        attributeName="opacity"
        values="1; .2; 1"
        begin="0.4s"
        dur="2s"
        repeatCount="indefinite"
      />
    </use>
  </svg>
);

export default Loading;
