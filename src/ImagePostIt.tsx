import { ReactElement, createElement, useState, useEffect } from "react";
import { ValueStatus } from "mendix";
import { ImagePostItContainerProps } from "../typings/ImagePostItProps";

import "./ui/ImagePostIt.css";

export function ImagePostIt({
    imageUrl,
    height,
    width,
    postItSource,
    xcoordinateAttr,
    ycoordinateAttr,
    postItIDAttr,
    colorAttr,
    onCreateAction,
    onPostItAction
}: ImagePostItContainerProps): ReactElement {

    if (imageUrl.status != ValueStatus.Available || postItSource.status != ValueStatus.Available) {
        return (<div />);
    }
    else {

        //All the post its from the source are loaded into the state "postIts"
        const [postIts, setPostIts] = useState<any>();

        // Get the items from data source and add them to the state "postIts"
        const updatePostIts = () => {
            var items = postItSource.items;
            var itemsToRender: JSX.Element[] = [];
            if (items) {
                var xPos, yPos, id, item: JSX.Element, color;

                for (var i = 0; i < items.length; i++) {
                    //Get values from each item
                    xPos = xcoordinateAttr.get(items[i]).value;
                    yPos = ycoordinateAttr.get(items[i]).value;
                    id = postItIDAttr.get(items[i]).value;
                    color = colorAttr.get(items[i]).value;

                    // Create a div for the post it
                    item = (<div style={{ height: height, width: width, background: color, position: "absolute", top: yPos, left: xPos }} onClick={onPostItClick} data-postitid={id} />);

                    itemsToRender.push(item);
                }
                
                //Update the state
                setPostIts(itemsToRender);
            }
        }

        //Run updatePostIts every time the data source updates
        useEffect(() => updatePostIts(), [postItSource]);

        const onImageClick = (event: any) => {
            //Save position of click to local storage
            savePostItLocalStorage(event);

            //Run on image click or post-it creation action
            if (onCreateAction && onCreateAction.canExecute) {
                onCreateAction.execute();
            }
        }

        const onPostItClick = (event: any) => {
            //Save the id of the post it in local storage
            savePostItLocalStorage(event);

            //Run on post-it click action
            if (onPostItAction && onPostItAction.canExecute) {
                onPostItAction.execute();
            }
        }

        const savePostItLocalStorage = (event: any) => {
            //Get the target element
            var parent = event.currentTarget;

            //If the target element is the image
            if(event.currentTarget.tagName === "IMG") {
                var rect = parent.getBoundingClientRect();
    
                var xPosition = event.clientX - rect.left - (width/2) + "px";
                var yPosition = event.clientY - rect.top - (height/2) + "px";

                localStorage.setItem("postItYCoordinate", yPosition);
                localStorage.setItem("postItXCoordinate", xPosition);
            }
            //If the target element is post it
            else{
                var id = event.currentTarget.attributes["data-postitid"].value;
                localStorage.setItem("postItID", id);
            }
        };


        // Return outer div, image inside and postIts as state.
        return (
        <div id="parentOuterDiv">
            <img src={imageUrl.value} onClick={onImageClick} style={{maxWidth:'100%'}} />
            {postIts}
        </div>);
    }
}
