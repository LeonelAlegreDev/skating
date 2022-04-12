const scrollButton = document.getElementById('scroll_cont');

window.addEventListener('scroll', checkHeight);

function checkHeight(){
    if(window.scrollY > 700)
    {
        scrollButton.style.display = "flex";
    }
    else
    {
        scrollButton.style.display = "none";

    }
}
scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});