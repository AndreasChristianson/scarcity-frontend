import type { Component } from "solid-js";

const Footer: Component = () => (
<footer>
  <div class="">
  {import.meta.env.VITE_SCARCITY_BACKEND}{import.meta.env.VITE_COMMIT}
  </div>
</footer>
);

export default Footer;
