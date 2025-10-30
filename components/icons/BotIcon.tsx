import React from 'react';

const BotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        {...props}
    >
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 16.5H3m18 0h-1.5m-15-13.5v1.5m13.5-1.5v1.5m-6.75 16.5v-1.5m-6.75 0v-1.5m1.5-6.75H8.25m7.5 0h-1.5m-6.75 0H12m-1.5 6.75v-1.5m1.5 1.5v-1.5" 
        />
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M12 18.75a6 6 0 006-6c0-1.753-.763-3.32-1.964-4.425a6.002 6.002 0 00-9.072 0A5.996 5.996 0 006 12.75a6 6 0 006 6z" 
        />
    </svg>
);

export default BotIcon;
