//utility file is created to store all the functions that can be crearted then all across the pages 

import {surpriseMePrompts} from '../constants';

export function getRandomPrompt(prompt){
    const randomIndex=Math.floor(Math.random() * surpriseMePrompts.length);
    const randomPrompt=surpriseMePrompts[randomIndex];

    if(randomPrompt===prompt){
        return getRandomPrompt(prompt);
    }
}


export async function downloadImage(_id,image) {
    FileSaver.saveAs(image, `download-${_id}.jpg`);
  }