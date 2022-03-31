import { Component, For, Match, Resource, Show, Switch } from "solid-js";
import { styled } from "solid-styled-components";
import backend from "../utils/backend";
import type { Displayable, Icon } from "./Displayable";
import LoadingIcon from "./LoadingIcon";

const buildUrl = (icon) => {
  if (icon.color) {
    return `${backend(icon.uri)}?color=${icon.color}`;
  } else {
    return `${backend(icon.uri)}`;
  }
};
const isString = (item: unknown) => typeof item === "string";

const isIcon = (item: any): item is Icon => isString(item.uri);

const isDisplayable = (item: any): item is Displayable =>
  item &&
  item.icon &&
  isIcon(item.icon) &&
  isString(item.name) &&
  isString(item.description);

const isDisplayableList = (item: any): item is [Displayable] =>
  item && item.isArray && item.every(isDisplayable);

const buildIcon = (iconUrl: string) =>
  styled("div")`
    background-repeat: no-repeat;
    background-image: url(${iconUrl});
  `;

const SmallIcon: Component<{ iconUrl: string }> = ({ iconUrl }) => {
  const Icon = buildIcon(iconUrl);
  return <Icon className="w-6 h-6" />;
};

const LargeIcon: Component<{ iconUrl: string }> = ({ iconUrl }) => {
  const Icon = buildIcon(iconUrl);
  return <Icon className="w-8 h-8" />;
};
const NameText: Component<{ text: string }> = ({ text }) => (
  <div
    class="leading-8 truncate capitalize text-lg font-bold mx-2"
  >
    {text}
  </div>
);

const Name: Component<{ iconUrl: string; name: string }> = ({
  iconUrl,
  name,
}) => (
  <div class="flex flex-row">
    <LargeIcon iconUrl={iconUrl} />
    <NameText text={name} />
  </div>
);

const Description: Component<{ text: string }> = ({ text }) => (
  <div class="leading-4 m-2  text-sm">{text}</div>
);

const Flavor: Component<{ text: string }> = ({ text }) => (
  <Show when={text}>
    <div class="mb-2 mx-2 text-xs text-center">{text}</div>
  </Show>
);

const Label: Component<{ text: string }> = ({ text }) => (
  <div
    class="leading-4 truncate capitalize text-sm"
  >
    {text}:
  </div>
);
const Value: Component<{ text: string }> = ({ text }) => (
  <div
    class="leading-4 truncate capitalize text-sm ml-2"
  >
    {text}
  </div>
);

const Field: Component<{ label: string; value: unknown }> = ({
  label,
  value,
}) => (
  <div class="flex flex-row">
    <Label text={label}/>
    <Switch>
      <Match when={isDisplayable(value)}>
        <ExpandableIcon displayable={value as Displayable} />
      </Match>
      <Match when={isDisplayableList(value)}>
        <For each={value as [Displayable]}>
          {(each) => <ExpandableIcon displayable={each} />}
        </For>
      </Match>
      <Match when={isString(value)}>
        <Value text={value as string}/>
      </Match>
    </Switch>
  </div>
);

const Fields: Component<{ [x: string]: unknown }> = ({ entries }) => (
  <div class="m-2">

  <For each={Object.entries(entries)}>
    {([key, value]) => <Field label={key} value={value} />}
  </For>
  </div>
);

const Popup: Component<{ displayable: Displayable }> = ({
  displayable: { icon, description, flavor, name, ...other },
}) => (
  <div class="-ml-1 -mt-7 border rounded-md bg-white flex flex-col max-w-2xl max-h-56">
    <Name iconUrl={buildUrl(icon)} name={name} />
    <Description text={description} />
    <hr />
    <Fields entries={other} />
    <Flavor text={flavor} />
  </div>

  //           {subDisplays}
);

const ExpandableIcon: Component<{ displayable: Displayable }> = ({
  displayable,
}) => {
  const HoverDestination = styled("div")`
    display: none;
    position: absolute;
  `;
  const Hover = styled("div")`
    &:hover ${HoverDestination.className} {
      display: block;
    }
  `;

  return (
    <Hover>
      <SmallIcon iconUrl={buildUrl(displayable.icon)} />
      <HoverDestination className="box-content">
        <Popup displayable={displayable} />
      </HoverDestination>
    </Hover>
  );
};

const Display: Component<{ resource: Resource<Displayable> }> = ({
  resource,
}) => (
  <Show when={!resource.loading} fallback={<LoadingIcon />}>
    <ExpandableIcon displayable={resource()}></ExpandableIcon>
  </Show>
);

// {
//   const url = buildUrl(icon);

//   const SubDisplay: Component<{ key: string }> = ({ key, children }) => (
//     <div class="leading-4 flex flex-row">
//       <div class="pr-2 w-32">{key}:</div>
//       {children}
//     </div>
//   );
//   const subDisplays = Object.entries(others).map(([key, value]) => {
//     if (isDisplayable(value)) {
//       return (
//         <SubDisplay key={key}>
//           <Display displayable={value} />
//         </SubDisplay>
//       );
//     } else if (isDisplayableList(value)) {
//       return (
//         <SubDisplay key={key}>
//           {value.map((v) => (
//             <Display displayable={v} />
//           ))}
//         </SubDisplay>
//       );
//     } else if (typeof value === "string") {
//       return (
//         <SubDisplay key={key}>
//           <div>{value}</div>
//         </SubDisplay>
//       );
//     }
//     return <SubDisplay key={key} />;
//   });
//   return (
//     <Show when={state.count > 0} fallback={<div>Loading...</div>}>
//       <span className="m-2 flex flex-col text-sm">
//         <Icon className="w-8 h-8 rounded-md border-transparent border" />
//         <Popup className="rounded-md max-w-lg max-h-72 flex flex-col border p-2 -mt-2 -ml-2">
//           <h1 class="capitalize font-bold leading-8 text-lg pl-10">{name}</h1>
//           <p class="leading-4 py-1">{description}</p>

//           {subDisplays}
//           {flavor && <p class="italic leading-4 pt-1 text-center">{flavor}</p>}
//         </Popup>
//       </span>
//     </Show>
//   );
// }

export default Display;
