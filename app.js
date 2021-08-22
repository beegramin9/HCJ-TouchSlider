const track = document.querySelector('.track');
const individualCard = document.querySelector('.card');

let previousStartMousePosition = 0;
let isCursorDragging = false;
let previouslyDraggedX = 0;

const handleGestureStart = e => {
    isCursorDragging = true;
    previousStartMousePosition = e.clientX;

    previouslyDraggedX = window.getComputedStyle(track)
    .getPropertyValue('transform')

    previouslyDraggedX = previouslyDraggedX === 'none'
                        ? 0
                        : parseInt(previouslyDraggedX.split(',')[4].trim());
}

const handleGestureMove = e => {
    if (isCursorDragging) {
        const currentConstPosition = e.clientX;
        const howMuchXMovedRightNow = currentConstPosition - previousStartMousePosition;
        const totalValueDraggedXFromStartLine = howMuchXMovedRightNow + previouslyDraggedX;
        // 1. 맨 왼쪽 카드 못 넘어가게 하기
        // 왼쪽으로 넘길 때 양수
        if (howMuchXMovedRightNow > 0) {
            // 왼쪽으로 넘길 때 최초(totalValueDraggedXFromStartLine=0)보다 더 왼쪽으로 가려 하면?
            if (totalValueDraggedXFromStartLine > 0) {
                return;
            }
        // 2. 맨 오른쪽 카드로 못 넘어가게 하기
        } else {
            // 반대 경우, 즉 오른쪽으로 넘길 때는
            // totalValueDraggedXFromStartLine이 음수인 상태로 절댓값이 커진다
            const cardWidth = parseInt(window.getComputedStyle(individualCard).getPropertyValue('width').slice(0, -2))
            const gap = parseInt(window.getComputedStyle(track).getPropertyValue('gap').slice(0, -2))
            if (Math.abs(totalValueDraggedXFromStartLine) > track.offsetWidth - cardWidth - gap) {
                return;
            }
        }
        
        
        
        track.style.transform = `translateX(${totalValueDraggedXFromStartLine}px)`
    }
}

const handleGestureEnd = () => {
    isCursorDragging = false;
}

const handleContextMenu = e => {
    e.preventDefault();
}



//* Chrome에서는 PointerEvent가 가능하다. mouse와 touch를 총괄하는...
// 불가능한 다른 브라우저에서는
// mousedown, mousemove, mouseup
// touchstart, touchmove, touchend로 따로따로 해줘야 한다
if (window.PointerEvent) {
    console.log('hey');
    track.addEventListener('pointerdown', handleGestureStart);
    track.addEventListener('pointermove', handleGestureMove);
    track.addEventListener('pointerup', handleGestureEnd);
    track.addEventListener('pointercancel', handleGestureEnd);
} else {
    console.log('else');
    //* Mouse Event
    track.addEventListener('mousedown', handleGestureStart);
    track.addEventListener('mousemove', handleGestureMove);
    track.addEventListener('mouseup', handleGestureEnd);
    track.addEventListener('mouseleave', handleGestureEnd);
    track.addEventListener('contextmenu', handleContextMenu);
    //* Touch Event
    // false는 event propagation 방지, event 중복 방지라고 생각하면 편하다
    track.addEventListener('touchstart', handleGestureStart, false);
    track.addEventListener('touchmove', handleGestureMove, false);
    track.addEventListener('touchend', handleGestureEnd, false);
    
}