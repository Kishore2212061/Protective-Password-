function generateDynamicPassword(password, fixedValue, keyValue, currentHour, trigFunction) {
    const digitSum = password.split('').reduce((sum, char) => {
        const charCode = char.toLowerCase().charCodeAt(0); // Get the character code
        if (charCode >= 97 && charCode <= 122) { // Check if it's between 'a' (97) and 'z' (122)
            return sum + (charCode - 96); 
        } 
        return sum; 
    }, 0);
    
    const angle = parseFloat(currentHour) + parseFloat(keyValue);
   
    let trigResult;
    switch (trigFunction) {
        case 'sin':
            trigResult = Math.sin(angle);
            break;
        case 'cos':
            trigResult = Math.cos(angle);
            break;
        case 'tan':
            trigResult = Math.tan(angle);
            break;
        default:
            trigResult = Math.sin(angle);
    }

    const calculatedPassword = (digitSum * Math.sin(parseFloat(fixedValue))  * trigResult).toFixed(3);
    return calculatedPassword;
}

module.exports = generateDynamicPassword;
