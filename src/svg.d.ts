// svg.d.ts
declare module "*.svg" {
  import { ReactElement, SVGProps } from "react";
  const content: {
    ReactComponent: (props: SVGProps<SVGSVGElement>) => ReactElement;
    default: string;
  };
  export = content;
}
