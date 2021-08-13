const slider = document.querySelector('.slider-container'),
slides = Array.from(document.querySelectorAll('.slide'))

let isDragging = false;
let previousMousePosition = 0;
let previousTranslateX = 0;
let currentTranslateX = 0;
let animationID = 0;
let currentSlideIndex = 0;

const handleGestureStart = (index) => {
    // ! addEventLister에서 ()로 Call했기때문에 함수를 리턴해야 함
    return function(event) {
        isDragging = true;
        currentSlideIndex = index;
        //! touch와 mouse일 때 previousMousePosition을 가져오는 게 다르다!
        //! 이래서 Portfolio에서 onScroll만 고집했던 것
        previousMousePosition = event.type.includes('mouse')
        ? event.pageX
        : event.touches[0].clientX

        animationID = requestAnimationFrame(animation)

    }
}

function animation() { 
    slider.style.transform = `translateX(20px)`
    if(isDragging) requestAnimationFrame(animation)
}

const handleGestureMove = () => {   
    if (isDragging) {
    }
}
const handleGestureEnd = () => {
    isDragging = false;
}

slides.forEach( (slide, index) => {
    // Delete Image Hallucination 
    const sliderImage = slide.querySelector('img');
    sliderImage.addEventListener('dragstart', e => e.preventDefault());

    //* Touch Event
    slide.addEventListener('touchstart', handleGestureStart(index))
    slide.addEventListener('touchmove', handleGestureMove)
    slide.addEventListener('touchend', handleGestureEnd)
    slide.addEventListener('touchleave', handleGestureEnd)
    
    //* Mouse Event
    slide.addEventListener('mousedown', handleGestureStart(index))
    slide.addEventListener('mousemove', handleGestureMove)
    slide.addEventListener('mouseup', handleGestureEnd)
    slide.addEventListener('mouseleave', handleGestureEnd)
})

//* prevent contextmenu
window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
}