/**
 * This file was generated from ImagePostIt.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, ListValue, ListAttributeValue } from "mendix";

export interface ImagePostItContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    imageUrl: DynamicValue<string>;
    height: number;
    width: number;
    postItSource: ListValue;
    xcoordinateAttr: ListAttributeValue<string>;
    ycoordinateAttr: ListAttributeValue<string>;
    postItIDAttr: ListAttributeValue<string>;
    colorAttr: ListAttributeValue<string>;
    onCreateAction?: ActionValue;
    onPostItAction?: ActionValue;
}

export interface ImagePostItPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    imageUrl: string;
    height: number | null;
    width: number | null;
    postItSource: {} | { type: string } | null;
    xcoordinateAttr: string;
    ycoordinateAttr: string;
    postItIDAttr: string;
    colorAttr: string;
    onCreateAction: {} | null;
    onPostItAction: {} | null;
}
