export const parseMoneyValue = (num) => {
    num = Math.round(num)
    let stringNum = num.toString();
    let letter;

    if (stringNum.length >= 13) {
        stringNum = (num /= 1000000000000).toFixed(1)
        letter = 'T'
    }
    else if (stringNum.length >= 10) {
        stringNum = (num /= 1000000000).toFixed(1)
        letter = 'B'
    }
    else if (stringNum.length >= 7) {
        stringNum = (num /= 1000000).toFixed(1)
        letter = 'M'
    }
    else {
        stringNum = (num /= 1000).toFixed(1)
        letter = 'K'
    }

    let lastIndex = stringNum.length - 1
    return `${stringNum.substring(0, lastIndex)}${stringNum[lastIndex]}${letter}`
}

export const getImg = (symbol) => `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;