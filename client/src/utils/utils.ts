/**
 * Swipe to elem in an array by modifying the array.
 * 
 * @param array array container 
 * @param index1 first index element
 * @param index2 second index element
 * @returns the modifyed array
 */
export function swipeArrayElem<T>(array: T[], index1: number, index2: number) {
    // Check if the indexs are valide
    if(index1 < 0 || index1 > array.length -1 
    || index2 < 0 || index2 > array.length -1)
    {
        return;
    }

    // Swipe array element
    [array[index1], array[index2]] = [array[index2], array[index1]]

    return array;
}

export function swipeArrayElemGroupe<T>(array: T[], index1: number, index2: number){
    if(index1 < 0 || index1 > array.length -1 
        || index2 < 0 || index2 > array.length -1)
        {
            return;
        }
    
        // Swipe array element
        [array[index1], array[index2]] = [array[index2], array[index1]]
    
        return array;
}

export const setPath = (value: any) => {
    
    window.location.pathname = value;


  }