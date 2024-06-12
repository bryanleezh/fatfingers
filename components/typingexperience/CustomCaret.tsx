import React from 'react';

type CustomCaretProps = {
    left: number;
    top: number;
    characterWidth: number;
};

export default function CustomCaret({ left, top, characterWidth } : CustomCaretProps) {
    const characterHeight = 32;

    return (
        <div
            className="absolute bg-muted-foreground h-7 w-1"
            style={{
                left: `${left * characterWidth}px`,
                top: `${top * characterHeight}px`,
                transition: 'left 0.1s, top 0.1s',
            }}
        ></div>
    );
};