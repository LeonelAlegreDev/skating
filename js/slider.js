const slideContainer = document.getElementById('slideContainer');
const leftButton = document.getElementById('boton_prev');
const rightButton = document.getElementById('boton_next');
const cards = document.querySelectorAll('.card');
const lastIndex = cards.length - 1;
const transitionTime = 1000;    //milliseconds

let left = lastIndex;    
let center = 0;                 
let right = 1;
let buttonReady = true;

displayCards(left, center, right);
setPosition(left, right);
displayUI();

function displayCards(left, center, right)
{
    cards[left].style.display = "flex";
    cards[left].style.width = slideContainer.offsetWidth + "px";
    cards[left].style.height = slideContainer.offsetHeight + "px";

    cards[center].style.display = "flex";
    cards[center].style.width = slideContainer.offsetWidth + "px";
    cards[center].style.height = slideContainer.offsetHeight + "px";

    cards[right].style.display = "flex";
    cards[right].style.width = slideContainer.offsetWidth + "px";
    cards[right].style.height = slideContainer.offsetHeight + "px";
}
function setPosition(left, right)
{
    removeTransition(center);
    removeTransition(right);
    removeTransition(left);
    
    cards[left].style.transform = "translateX(-100%)";
    cards[center].style.transform = "translateX(0)";
    cards[right].style.transform = "translateX(100%)";
}
function moveLeft()
{
    if(buttonReady)
    {
        setTimeout(function()
        {
            buttonReady = true;
        }, (transitionTime));

        addTransition(center);
        addTransition(right);
    
        cards[center].style.transform = "translateX(-100%)";
        cards[right].style.transform = "translateX(0)";
    
        deleteCard(left);
        deleteCard(center);
        deleteCard(right);
    
        if(left == lastIndex)
        {
            left = 0;
        }else
        {
            left ++;
        }
        
        if(right == lastIndex)
        {
            right = 0;
        }else
        {
            right ++;
        }
    
        if(center == lastIndex)
        {
            center = 0;
        }else
        {
            center ++;
        }
        
        setTimeout(function()
        {
            displayCards(left, center, right);
            setPosition(left, right);
        }, transitionTime);
    }
    buttonReady = false;
}
function moveRight()
{    
    if(buttonReady)
    {
        setTimeout(function()
        {
            buttonReady = true;
        }, transitionTime);

        addTransition(center);
        addTransition(left);
    
        cards[center].style.transform = "translateX(100%)";
        cards[left].style.transform = "translateX(0)";
        deleteCard(left);
        deleteCard(center);
        deleteCard(right);
    
        if(left == 0)
        {
            left = lastIndex;
        }else
        {
            left --;
        }
        
        if(right == 0)
        {
            right = lastIndex;
        }else
        {
            right --;
        }
    
        if(center == 0)
        {
            center = lastIndex;
        }else
        {
            center --;
        }
    
        setTimeout(function()
        {
            displayCards(left, center, right);
            setPosition(left, right);
        }, transitionTime);    
    }
    buttonReady = false;
}
function deleteCard(card)
{
    setTimeout(function (){
        cards[card].style.display = "none";
    }, transitionTime);
}
function displayUI()
{
    leftButton.style.transform =  "translateY(-"+ slideContainer.offsetHeight + "px)";
    rightButton.style.transform =  "translateY(-"+ slideContainer.offsetHeight + "px)";
}
function addTransition(index)
{
    cards[index].style.transition = transitionTime / 1000 + "s";
}
function removeTransition(index)
{
    cards[index].style.transition = "0s";
}

const observer = new ResizeObserver(entries => {
    displayCards(left, center, right);
    displayUI();
});
observer.observe(slideContainer);

function refreshData()
{   
    const x = 3;
    moveLeft();
    setTimeout(refreshData, x * 1000);
}
setTimeout(function(){
    refreshData();
},3000)


