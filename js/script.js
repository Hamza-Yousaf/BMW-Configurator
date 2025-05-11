const topBar = document.querySelector('#top-bar')
const exteriorColorSection = document.querySelector('#exterior-buttons')
const interiorColorSection = document.querySelector('#interior-buttons')
const wheelSection = document.querySelector('#wheel-buttons')
const exteriorImage = document.querySelector('#exterior-image')
const interiorImage = document.querySelector('#interior-image')

let color = 'white';
let wheel = '951';


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
    let intColor

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


// Wheel selection
// const wheelButtonClick = (event) => {
//     let button

//     if(event.target.tagName === 'IMG') {
//         button = event.target.closest('button');
//     } else if(event.target.tagName === 'BUTTON') {
//         button = event.target;
//     }

//     const buttons = event.currentTarget.querySelectorAll('button');
//     buttons.forEach((btn) => btn.classList.remove('btn-selected'));
//     button.classList.add('btn-selected');

//     wheel = button.querySelector('img').alt

//     let key = color + '-' + wheel
//     exteriorImage.src = wheelImages[key]

//     console.log(key)
// }

window.addEventListener('scroll', () => {
    requestAnimationFrame(barScroll);
})

exteriorColorSection.addEventListener('click', optionSelector)
interiorColorSection.addEventListener('click', optionSelector)
wheelSection.addEventListener('click', optionSelector)