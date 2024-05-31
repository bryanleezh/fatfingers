import CustomizeBar from "./CustomizeBar";
import TyperInput from "./TyperInput";

// TODO: Add conditional for game start to replace CustomizeBar with timer
export default function Typer() {
    return (
        <div className="flex flex-col gap-4 w-3/4 flex-grow items-center justify-center">
            <CustomizeBar />
            <div className="flex flex-grow items-center justify-center w-full">
                <TyperInput />
            </div>
        </div>
    )
};