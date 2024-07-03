import { encode as Base64Encode } from 'js-base64';
import { v4 as uuidv4 } from 'uuid';

export default function UniqueStringId() {
    return Base64Encode(`${uuidv4()}`); 
};