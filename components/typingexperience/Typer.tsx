// TODO: use Zustand to manage state to keep track of score

import CustomizeBar from "./CustomizeBar";
import TyperInput from "./TyperInput";

export default function Typer() {
    return (
        <div className="flex flex-col flex-grow gap-4 w-3/4">
            <CustomizeBar />
            <div className="flex flex-grow">
                <TyperInput />
            </div>
        </div>
    )
};