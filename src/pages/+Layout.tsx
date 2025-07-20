import getTitle from "@/utils/get-title";
import { type FlowProps } from "solid-js";
import { useMetadata } from "vike-metadata-solid";

import "@/styles/app.css";

useMetadata.setGlobalDefaults({
  title: getTitle("Home"),
  description: "Roll your own auth with the Lucia book with super easy to copy examples.",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
});

export default function RootLayout(props: FlowProps) {
  return (
    <>
      <div>{props.children}</div>
    </>
  );
}
