// 'use client'

import { CreateItemTypeDto, CreateMeasurementDto, ItemTypeDto } from '@/dto';
import ItemTypeService from '@/services/item_type_service';
import React from 'react';

const itemTypeService : ItemTypeService = new ItemTypeService(); 


const Home: React.FC =async () => {
    
    const list_item:ItemTypeDto[] = await itemTypeService.getItemTypes();


    const itemType: CreateItemTypeDto = {
        name: 'test',
    };
   

    const sendData =async () => {
      itemTypeService.createItemType(itemType);
    };

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            {/* Add your content here */}
            {/* <button onClick={sendData}>Send Data</button> */}
            <ul>
                {list_item.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;