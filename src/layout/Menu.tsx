import { Component, createResource } from "solid-js";
import EnvironmentDisplay from "../concrete/EnvironmentDisplay";
import Loading from "../concrete/Loading";

const Menu: Component = () => {

  return (
    <div class="flex" >
      <EnvironmentDisplay/>
      <EnvironmentDisplay/>
      {/* <Loading /> */}
    </div>
  );
};
export default Menu;
