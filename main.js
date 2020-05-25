//menu

const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');
// open or close menu
hamburger.addEventListener('click', () =>{
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
});
/*console.dir*/
document.body.addEventListener('click', (event) =>{
/*console.log(event)*/
if(!event.target.closest('.left-menu')){
/*console.log('click out menu');*/
leftMenu.classList.remove('openMenu');
    hamburger.classList.remove('open');
}

});
leftMenu.addEventListener('click', event =>{
    const target = event.target;
    const dropdown = target.closest('.dropdown');
    if(dropdown){
       dropdown.classList.toggle('active');
       leftMenu.classList.add('openMenu');
       hamburger.classList.add('open');
    }

});

