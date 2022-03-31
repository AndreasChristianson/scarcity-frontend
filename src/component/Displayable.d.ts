export interface Displayable {
  description: string;
  name: string;
  flavor?: string;
  icon: Icon;
  [x: string]: unknown|Displayable;
}

export interface Icon{
  uri: string;
  offset?: {
    x: number;
    y: number;
  };
  size?: {
    x: number;
    y: number;
  };
  color?: string;
}
