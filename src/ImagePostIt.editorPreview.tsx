import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { ImagePostItPreviewProps } from "../typings/ImagePostItProps";

export function preview({}: ImagePostItPreviewProps): ReactElement {
    return <HelloWorldSample/>;
}

export function getPreviewCss(): string {
    return require("./ui/ImagePostIt.css");
}
