type CharacterProps = {
    state?: boolean;
    char: string;
};

export default function Character( { state, char } : CharacterProps ) {
    const stateClassName = 
        state === undefined ? 'text-muted-foreground' : 
        state ? 'text-primary' : 'text-destructive'

    return (
        <span
            className={`${stateClassName} font-mono`}
        >
            {char}
        </span>
    )
}