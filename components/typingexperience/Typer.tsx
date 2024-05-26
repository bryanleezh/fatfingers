// TODO: use Zustand to manage state to keep track of score

import CustomizeBar from "./CustomizeBar";
import TyperInput from "./TyperInput";

export default function Typer() {
    return (
        <div className="flex flex-col flex-grow">
            <CustomizeBar />
            <div className="flex flex-grow">
                <TyperInput />
            </div>
        </div>
    )
};