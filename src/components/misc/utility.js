export const reverseArray = (actualArray) => {
    let reversedArray = [];
    for (let i=actualArray.length-1; i >=0; i--){
        reversedArray.push(actualArray[i])
    }
    return reversedArray
}

export const validate = (element) => {
    let error= [true, ''];
    if(element.validation.required){
        const valid = element.value.trim() !== ''
        const message = `${!valid ? 'This field is required' : ''}`;
        error = !valid ? [valid, message]: error
        return error
    }
}