const itemContainer = document.querySelector('.items');

let isDown = false;
let previousStartMousePosition;
let previouslyDraggedX ;

itemContainer.addEventListener('mousedown', (e)=> {
    isDown = true;
    previousStartMousePosition = e.pageX - itemContainer.offsetLeft;
    previouslyDraggedX = itemContainer.scrollLeft;
});
itemContainer.addEventListener('mousemove', (e)=> {
    if (!isDown) return;
    // css: user-select와 같은 역할
    e.preventDefault();
    const mousePositionRightNow = e.pageX - itemContainer.offsetLeft;
    const MovedLeftMinusOrRightPlus = (mousePositionRightNow - previousStartMousePosition) * 3;

    // 매번마다 scrollLeft가 0부터 초기화된다.
    // 즉 이전에 dragged 된 걸 가져와야 한다.
    itemContainer.scrollLeft = MovedLeftMinusOrRightPlus - previouslyDraggedX;
});
itemContainer.addEventListener('mouseup', ()=> {
    isDown = false;
});
itemContainer.addEventListener('mouseleave', ()=> {
    isDown = false;
});