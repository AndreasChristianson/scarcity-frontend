import { Component, createResource } from "solid-js";
import Display from "../component/Display";
import { Displayable } from "../component/Displayable";
import backend from "../utils/backend";

const fetchBackendInfo = async ():Promise<Displayable> => {
  const response = await fetch(backend("/actuator/info"));
  return {
    icon: {
      uri: "/svg/world.svg",
      color: import.meta.env.PROD ? "red" : "green",
    },
    name: import.meta.env.PROD
      ? "production environment"
      : "development environment",
    description:
      "Commit SHAs, hostnames, and variables related to the current environment",
    backendUrl: import.meta.env.VITE_SCARCITY_BACKEND,
    frontendGitSha: import.meta.env.VITE_COMMIT,
    backendGitSha: (await response.json()).commit,
    flavor: "I don't always test my code...",
  }
};

const EnvironmentDisplay: Component = () => {
  const [backendInfo] = createResource(fetchBackendInfo);
  return <Display resource={backendInfo} />;
};
export default EnvironmentDisplay;
