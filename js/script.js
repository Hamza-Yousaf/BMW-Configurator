const topBar = document.querySelector('#top-bar')
const exteriorColorSection = document.querySelector('#exterior-buttons')
const interiorColorSection = document.querySelector('#interior-buttons')
const wheelSection = document.querySelector('#wheel-buttons')
const exteriorImage = document.querySelector('#exterior-image')
const interiorImage = document.querySelector('#interior-image')

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

const colorButtonClick = (event) => {
    let button;

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
            const color = button.querySelector('img').alt;
            exteriorImage.src = exteriorImages[color];
        } else if(event.currentTarget === interiorColorSection) {
            const color = button.querySelector('img').alt;
            interiorImage.src = interiorImages[color];
        }
    }
}

window.addEventListener('scroll', () => {
    requestAnimationFrame(barScroll);
})

exteriorColorSection.addEventListener('click', colorButtonClick)
interiorColorSection.addEventListener('click', colorButtonClick)
wheelSection.addEventListener('click', colorButtonClick)