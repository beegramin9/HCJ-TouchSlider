const cardContainer = document.querySelector('.card-container');
const individualCard = document.querySelector('.card');

let isCursorDragging = false;
let previousStartMousePosition = 0; // 클릭했을 때의 마우스 첫 위치
let previouslyDraggedX = 0;

window.addEventListener('mousedown', (e)=> {
    isCursorDragging = true;
    previousStartMousePosition = e.clientX;
    // 마우스 클릭 시 이전에 translateX된 값을 가져와서 사용하는 것
    previouslyDraggedX = window.getComputedStyle(cardContainer)
    .getPropertyValue('transform')
    previouslyDraggedX = previouslyDraggedX === 'none' 
                                    ? 0 
                                    : parseInt(previouslyDraggedX.split(',')[4].trim())
    console.log(previouslyDraggedX);
})

window.addEventListener('mousemove', (e)=> {
    if (isCursorDragging) {
        const currentMousePosition = e.clientX; // mouseup했을 때 마지막 마우스 위치, 즉 현재 위치
        console.log('currentMousePosition:',currentMousePosition);
        const howMuchXMovedRightNow = currentMousePosition - previousStartMousePosition;
        console.log('howMuchXMovedRightNow:',howMuchXMovedRightNow);

        const totalValueDraggedXFromStartLine = howMuchXMovedRightNow + previouslyDraggedX;
        
        // 1. 맨 왼쪽 Card를 넘어가지 못하게 하기
        if (howMuchXMovedRightNow > 0) { 
            // 왼쪽으로 넘어갈 때 양수
            // 즉 왼쪽으로 넘어가면서 스타트라인의 왼쪽으로 가는 순간 return해서
            // 1번 카드의 왼쪽으로 넘어가지 못하게 한다
            if (totalValueDraggedXFromStartLine > 0) { // 
                return;
            }
        // 2. 맨 오른쪽 Card를 넘어가지 못하게 하기
        } else {
            // 반대 경우, 즉 오른쪽으로 넘어가고 있을 때
            // totalValueDraggedXFromStartLine 음수값이 된다.
            // 여기서는 cardContainer의 전체 길이와 카드 한장 사이의 수적 비교가 필요하므로
            // 절대값을 씌워 양수 >> 양수끼리 비교해줘야 한다
            const cardWidth = parseInt(window.getComputedStyle(individualCard).getPropertyValue('width').slice(0, -2))
            const gap = parseInt(window.getComputedStyle(cardContainer).getPropertyValue('gap').slice(0, -2))
         
            if (Math.abs(totalValueDraggedXFromStartLine) > cardContainer.offsetWidth - cardWidth - gap) {
                return;
            }
                // cardContainer 전체보다 오른쪽으로 갔을 때 return해서 멈춘다
                // 그런데 마지막 카드의 넓이만큼 일찍 끝나야 하므로 빼준다totalValueDraggedXFromStartLine
        }



        // console.log('howMuchXMovedRightNow:',howMuchXMovedRightNow);
        cardContainer.style.transform = `translateX(${totalValueDraggedXFromStartLine}px)`;
        // translateX: 대상 Card가 왼쪽으로 가면 -값, 오른쪽으로 가면 +값
        // 단! 대상이 처음 rendered된 위치가 항상 기준이 되는 absolute한 값이기 때문에
        // 움직일 때마다 초기화된다. 그러므로 previous translateX값을 가져와야 한다
    } 
})



window.addEventListener('mouseup', ()=> {
    isCursorDragging = false;
})