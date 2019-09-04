const dateCard = document.getElementById('date_card');
const numberCard = document.getElementById('number_card');

dateCard.onkeypress = () => {
    if (dateCard.value.length >= 2 && dateCard.value.length <= 3) {
        dateCard.value += ' / '
    }
}

numberCard.onkeypress = () => {
    if (numberCard.value.length === 4 || numberCard.value.length === 9 || numberCard.value.length === 14) {
        numberCard.value += ' '
    }
}