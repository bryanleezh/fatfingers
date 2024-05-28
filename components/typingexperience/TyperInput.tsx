"use client";

import { useSettingsStore } from "@/store/settings";
import { Input } from "../ui/input";
import TextWrapper from "./TextWrapper";
import TextContainer from "./TextContainer";

export default function TyperInput() {
    const time = useSettingsStore((state) => state.time);
    const mode = useSettingsStore((state) => state.mode);
    const textinput = "provided pish aboard without helpless crisp and exactly escalator yippee behind ack vector misconceive unabashedly per steep once gadzooks sight mmm throughout longingly vice appropriate versus desire plastic hm eek";
    // const textinput = "hi welcome to fat fingers";
    
    // TODO: Create custom caret
    const startCaret = () => {
        console.log("caret start");
    }

    // TODO: Add font theming
    // TODO: Add core typing module
    // TODO: Add smooth cursor to input
    // TODO: Add separate cursor with smooth logic
    // TODO: Add scoring logic
    return (
        <div className="w-full h-full mx-auto flex flex-col items-center justify-center max-w-5xl gap-4 px-4 xl:px-0">
            <TextWrapper>
                <TextContainer word={textinput}/>
            </TextWrapper>
        </div>
    )
};