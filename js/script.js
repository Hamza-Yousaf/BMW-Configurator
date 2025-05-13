const topBar = document.querySelector('#top-bar')
const exteriorColorSection = document.querySelector('#exterior-buttons')
const interiorColorSection = document.querySelector('#interior-buttons')
const wheelSection = document.querySelector('#wheel-buttons')
const exteriorImage = document.querySelector('#exterior-image')
const interiorImage = document.querySelector('#interior-image')
const totalPrice = document.querySelector('#total-price')
const carbonMirrorCheckBox = document.querySelector('#carbon-mirror-checkbox')
const carbonSpoilerCheckBox = document.querySelector('#carbon-spoiler-checkbox')
const carbonRoofCheckBox = document.querySelector('#carbon-roof-checkbox')
const performancePackageButton = document.querySelector('#performance-package')
const advancedDriverPackageButton = document.querySelector('#advanced-driver-package')
const sunshadesCheckBox = document.querySelector('#sunshades-checkbox')
const redBrakesCheckBox = document.querySelector('#red-compound-brakes-checkbox')
const mDrviersPackageCheckBox = document.querySelector('#m-drivers-package-checkbox')
const estimatedMonthlyPayment = document.querySelector('#monthly-payment')

let color = 'white';
let wheel = '951';
let intColor;
let totalPriceNum = 75000;
let selected1 = false
let selected2 = false
let priceP = 8000
let priceA = 2000
let messageP = 'Performance Upgrade (+$8000)'
let messageA = 'Advanced Driver Assistance Package (+$2000)'


// top bar movement
const barScroll = () => {
    const atTop = window.scrollY === 0;
    topBar.classList.toggle('visible-bar', atTop);
    topBar.classList.toggle('hidden-bar', !atTop);
}

// image color map
const exteriorImages = {
    'white': '/images/white_951.png',
    'black': '/images/black_951.png',
    'green': '/images/green_951.png',
    'blue': '/images/blue_951.png',
    'red': '/images/red_951.png'
}

const interiorImages = {
    'black-int': '/images/interior_black.png',
    'red-int': '/images/interior_red.png'
}

const wheelImages = {
    'white-951': '/images/white_951.png',
    'white-952': '/images/white_952.png',
    'black-951': '/images/black_951.png',
    'black-952': '/images/black_952.png',
    'green-951': '/images/green_951.png',
    'green-952': '/images/green_952.png',
    'blue-951': '/images/blue_951.png',
    'blue-952': '/images/blue_952.png',
    'red-951': '/images/red_951.png',
    'red-952': '/images/red_952.png'
};

const optionSelector = (event) => {
    let button;
    let key;

    if(event.target.tagName === 'IMG') {
        button = event.target.closest('button');
    } else if(event.target.tagName === 'BUTTON') {
        button = event.target;
    }

    if(button) {
        const buttons = event.currentTarget.querySelectorAll('button');
        buttons.forEach((btn) => btn.classList.remove('btn-selected'));
        button.classList.add('btn-selected');

        if(event.currentTarget === exteriorColorSection) {
            color = button.querySelector('img').alt;
            key = color + '-' + wheel
            exteriorImage.src = wheelImages[key]
        }
        
        if(event.currentTarget === interiorColorSection) {
            intColor = button.querySelector('img').alt;
            interiorImage.src = interiorImages[intColor];
        }
        
        if(event.currentTarget === wheelSection) {
            wheel = button.querySelector('img').alt
            key = color + '-' + wheel
            exteriorImage.src = wheelImages[key]
        }
    }
}

const carbonSelector = (event) => {
    let checkBox

    if(event.target.tagName == 'INPUT') {
        checkBox = event.target
        
        if(checkBox.checked) {
            // console.log(checkBox)
            totalPriceNum += 1300
        } else {
            totalPriceNum -= 1300
        }
    }

    displayPrice(totalPriceNum)
    costBreakdown(totalPriceNum)
}

const packageSelector = (event) => {
    let button

    if(event.target.tagName == 'BUTTON') {
        button = event.target
        console.log(button)

        if(button.id == 'performance-package') {
            selected1 = checkSelected(selected1, priceP, messageP, button)
        } else if(button.id == 'advanced-driver-package') {
            selected2 = checkSelected(selected2, priceA, messageA, button)
        }
    }

    console.log(selected1, selected2)
    displayPrice(totalPriceNum)
    costBreakdown(totalPriceNum)
}

const checkSelected = (selected, price, message, button) => {
    if(selected == false) {
        selected = true;
        button.classList.add('package-selected')
        button.innerHTML = message + 'SELECTED'
        totalPriceNum += price
    } else if(selected == true) {
        selected = false;
        button.classList.remove('package-selected')
        button.innerHTML = message
        totalPriceNum -= price
    }

    return selected
}

const extraSelector = (event) => {
    let checkBox
    let checkBoxId

    if(event.target.tagName == 'INPUT') {
        checkBox = event.target
        checkBoxId = checkBox.id

        if(checkBox.checked){
            switch(checkBoxId) { 
                case 'sunshades-checkbox':
                    totalPriceNum += 1000
                    break
                case 'red-compound-brakes-checkbox':
                    totalPriceNum += 750
                    break
                case 'm-drivers-package-checkbox':
                    totalPriceNum += 2500
                    break
            }
        } else if (!(checkBox.checked)) {
            switch(checkBoxId) { 
                case 'sunshades-checkbox':
                    totalPriceNum -= 1000
                    break
                case 'red-compound-brakes-checkbox':
                    totalPriceNum -= 750
                    break
                case 'm-drivers-package-checkbox':
                    totalPriceNum -= 2500
                    break
            }
        }

    }

    displayPrice(totalPriceNum)
    costBreakdown(totalPriceNum)
}


const calcTotalPrice = () => {
    if(color != 'white') {
        totalPriceNum += 975;
    }

    if(intColor == 'red-int') {
        totalPriceNum += 1150;
    }

    if(wheel == '952') {
        totalPriceNum += 750;
    }

    displayPrice(totalPriceNum)
    costBreakdown(totalPriceNum)
}

const costBreakdown = () => {
    let downPayment = 7500
    let APR = 0.04
    let loanAmount = totalPriceNum - downPayment
    let monthlyInterestRate = APR / 12
    let numberOfMonths = 60

    let monthlyPayment = loanAmount * (monthlyInterestRate*(1 + monthlyInterestRate)**numberOfMonths)/(((1 + monthlyInterestRate)**numberOfMonths) - 1)

    monthlyPayment = monthlyPayment.toFixed(2)

    
    estimatedMonthlyPayment.innerHTML = '$' + monthlyPayment.toLocaleString();
}

const displayPrice = (price) => {
    totalPrice.innerHTML = '$' + price.toLocaleString();
}


window.addEventListener('scroll', () => {
    requestAnimationFrame(barScroll);
})

window.addEventListener('DOMContentLoaded', () => {
    calcTotalPrice();
});

exteriorColorSection.addEventListener('click', (event) => {
    optionSelector(event)
    calcTotalPrice()
})

interiorColorSection.addEventListener('click', (event) => {
    optionSelector(event)
    calcTotalPrice()
})

wheelSection.addEventListener('click', (event) => {
    optionSelector(event)
    calcTotalPrice()
})

carbonMirrorCheckBox.addEventListener('click', carbonSelector)
carbonSpoilerCheckBox.addEventListener('click', carbonSelector)
carbonRoofCheckBox.addEventListener('click', carbonSelector)

performancePackageButton.addEventListener('click', packageSelector)
advancedDriverPackageButton.addEventListener('click', packageSelector)

sunshadesCheckBox.addEventListener('click', extraSelector)
redBrakesCheckBox.addEventListener('click', extraSelector)
mDrviersPackageCheckBox.addEventListener('click', extraSelector)