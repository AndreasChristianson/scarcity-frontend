import { Component, createResource } from "solid-js";
import EnvironmentDisplay from "../concrete/EnvironmentDisplay";

const Menu: Component = () => {

  return (
    <div class="flex" >
      <EnvironmentDisplay/>
    </div>
  );
};
export default Menu;
