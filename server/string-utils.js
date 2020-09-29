const toTitleCase = (text) => {
    const lowerCase = text.toLowerCase();
    const wordArray = lowerCase.split(' ');
    for (let i = 0; i < wordArray.length; i++) {
        wordArray[i] = wordArray[i].charAt(0).toUpperCase() + wordArray[i].slice(1)
    }
    const titleCase = wordArray.join(' ')
    return titleCase
} 

module.exports = toTitleCase;