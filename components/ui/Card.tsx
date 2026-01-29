import React from 'react';

interface ICardProps {
    title: string;
    text: string;
    icon?: React.ReactNode;
};

export function Card(props: ICardProps) {
    const { title, text, icon } = props;

    return (
        <div className="p-6 rounded-xl shadow-md border border-gray-200 flex flex-col items-center text-center px-4">
            {
                icon && <div className="mb-6">{icon}</div>
            }

            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-white">{text}</p>
        </div>
    );
}
