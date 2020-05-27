const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const API_KEY = 'affc29fcc90a4770f2829685b5ce4148';
console.log('hello js');


const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');
// open or close menu
hamburger.addEventListener('click', () =>{
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
});
//console.dir
document.body.addEventListener('click', (event) =>{
//console.log(event)
if(!event.target.closest('.left-menu')){
//console.log('click out menu');
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

//open modal window
const tvShowList = document.querySelector('.tv-shows__list');
const modal = document.querySelector('.modal');

tvShowList.addEventListener('click', event =>{
    event.preventDefault(true);
    const target = event.target;
    const card = target.closest('.tv-card');
    //console.log(target);
    if(card){
        document.body.style.overflow = 'hidden';
        modal.classList.remove('hide');
    }
});

//close modal window
modal.addEventListener('click', event =>{
    //console.log(event.target.closest('.cross'));
    if(event.target.closest('.cross')  ||
    event.target.classList.contains('modal')){
        document.body.style.overflow = '';
        modal.classList.add('hide');
    };
});

//change card picture
const changeImg = event =>{
    const card = event.target.closest('.tv-shows__item');
    
    if(card){
        const img = card.querySelector('.tv-card__img');
       if(img.dataset.backdrop){
            [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src];
        }            
    }
};
tvShowList.addEventListener('mouseover', changeImg);
tvShowList.addEventListener('mouseout', changeImg);

//list generation

const DBservice = class{
    getData = async(url) => {
        const res = await fetch(url);
        if(res.ok) {
            return res.json();        
    }else {
        throw new Error(`can not get data ${url}`)
    }
    }
    getTestdata = async () => {
        return await this.getData('test.json');
    }
   
}


const renderCard = response => {
    //console.log(response);
    tvShowList.textContent='';
    response.results.forEach(item =>{
        const {
            backdrop_path: backdrop,
            name: title,
            poster_path: poster,
            vote_average: vote
        } = item;

        //console.log(item);
        console.log(vote);

        const posterImg = poster ?  IMG_URL + poster : `img/no-poster.jpg`;
        const backdropImg=backdrop ? IMG_URL + backdrop : '';
        let voteStyle =vote.closest('.tv-card span').visiblity='hidden';
        const voteElem = (vote == 0) ? voteStyle : vote;
        //document.getElementsByClassName('tv-card__vote'); console.log(voteElem)
       

        const card = document.createElement('li');
        card.classList.add(".tv-shows__item");
        card.innerHTML = `
            <a href="#" class="tv-card">
                <span class="tv-card__vote">${vote}</span>
                <img class="tv-card__img"
                src="${posterImg}"
                data-backdrop="${IMG_URL + backdrop}"
                alt="${title}">
                <h4 class="tv-card__head">${title}</h4>
            </a>`;
        tvShowList.append(card);
        //tvShowList.prepend(card);

        //console.log(card);
    })
}
new DBservice().getTestdata().then(renderCard);

//
//
/*change pic

let cnangeElements = document.getElementsByClassName("tv-card");
console.log(cnangeElements);
for( let i = 0; i < cnangeElements.length; i++){
    console.log(cnangeElements[i]);
}*/
