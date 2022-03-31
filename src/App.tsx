import type { Component } from "solid-js";
import Examples from "./layout/Examples";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";

const App: Component = () => (
  <div class="flex flex-col">
    <Header />
    <Menu />
    <Examples />
    <Footer />
  </div>
);

export default App;
