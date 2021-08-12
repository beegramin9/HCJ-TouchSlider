const track = document.querySelector('.track');

let previousStartMousePosition = 0;

window.addEventListener('mousedown', e => {
    previousStartMousePosition = e.clientX;
});

window.addEventListener('mousemove', e => {
    const currentConstPosition = e.clientX;
    const howMuchXMovedRightNow = currentConstPosition - previousStartMousePosition;
    track.style.transform = `translateX(${howMuchXMovedRightNow}px)`
});