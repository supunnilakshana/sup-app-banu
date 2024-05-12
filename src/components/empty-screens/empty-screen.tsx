import React from 'react';

interface EmptyScreenProps {
    message: string;
}

const EmptyScreen: React.FC<EmptyScreenProps> = ({ message }) => {
    return (
        <div>
            <h1>{message}</h1>
            <p>This is the primary empty screen component.</p>
        </div>
    );
};

export default EmptyScreen;