import { CreateItemTypeDto, CreateMeasurementDto } from '@/dto';
import React from 'react';


const Home: React.FC = () => {

    const itemType: CreateItemTypeDto = {
        name: 'name',
    };
    const measurement: CreateMeasurementDto = {
        name: 'name',
    };




    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            {/* Add your content here */}
        </div>
    );
};

export default Home;