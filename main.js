const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const Server = 'https://api.themoviedb.org/3';
const API_KEY = 'affc29fcc90a4770f2829685b5ce4148';
console.log('hello js');


const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');

const tvShowList = document.querySelector('.tv-shows__list');
const modal = document.querySelector('.modal');
const tvShows = document.querySelector('.tv-shows');
const tvCardImg = document.querySelector('.tv-card__img'),
modalTitle = document.querySelector('.modal__title'),
genresList = document.querySelector('.genres-list'),
rating = document.querySelector('.rating'),
description = document.querySelector('.descriptio'),
modalLink = document.querySelector('.modal__link'),
searchForm = document.querySelector('.search__form'),
searchFormInput = document.querySelector('.search__form-input'),
preloader = document.querySelector('.preloader'),
dropdown = document.querySelectorAll('.dropdown'),
tvShowsHead = document.querySelector('.tv-shows__head'),
posterWrapper = document.querySelector('.poster__wrapper'),
modalContent = document.querySelector('.modal__content'),
pagination = document.querySelector('.pagination');


const loading = document.createElement('div');

loading.className = 'loading';
//console.log(document.querySelectorAll('div'));
const div = document.getElementsByTagName('div');


//list generation
const DBservice = class{
//class DBServise {
    constructor(){
         this.Server = 'https://api.themoviedb.org/3';
         this.API_KEY = 'affc29fcc90a4770f2829685b5ce4148';
    }
    getData = async(url) => {
        //tvShows.append(loading);
        const res = await fetch(url);
        if(res.ok) {
            return res.json();        
    }else {
        throw new Error(`can not get data ${url}`)
    }
    };
    getTestdata = /*async*/ () => {
        return /*await*/ this.getData('test.json');
    };
   getTestCard = () => {
       return this.getData('card.json');
   };
   getSearchResult = query => {
       this.temp = `${this.Server}/search/tv?api_key=${this.API_KEY}&language=ru-RU&query=${query}`;
       return this.getData(this.temp);
       //return this.getData('https://api.themoviedb.org/3/search/multi?api_key=affc29fcc90a4770f2829685b5ce4148&language=ru-RU&query=%D0%9A%D1%83%D1%85%D0%BD%D1%8F&page=1&include_adult=false');
   };
   getNextPage = page => {
       return this.getData(this.temp + '&page' + page);
   }
   getTvShow = id =>{
       return this.getData(`${this.Server}/tv/${id}?api_key=${this.API_KEY}&language=ru-RU`)
       //`${this.Server}/tv/${id}?api_key=${this.API_KEY}&language=ru-RU`
   };
   //https://developers.themoviedb.org/3/movies/get-movie-details
   getTopRated = () => this.getData(`${this.Server}/tv/top_rated?api_key=${this.API_KEY}&language=ru-RU`);
   getPopular = () => this.getData(`${this.Server}/tv/popular?api_key=${this.API_KEY}&language=ru-RU`);
   getToday = () => this.getData(`${this.Server}/tv/airing_today?api_key=${this.API_KEY}&language=ru-RU`);
   getWeek = () => this.getData(`${this.Server}/tv/on_the_air?api_key=${this.API_KEY}&language=ru-RU`);
}

const dbService = new DBservice();

console.log(new DBservice().getSearchResult("стражи галактики"));
const renderCard = (response, target) => {

    //debugger;
    
    tvShowList.textContent='';

    console.log(response);
    if (!response.total_results){
        loading.remove();
        tvShowsHead.textContent = 'Unfotinally there is no any films you want';
        //tvShowsHead.style.cssText = 'color: red; border-bottom: 2px solid red'
        tvShowsHead.style.color = 'red';
        return;
    }
    tvShowsHead.textContent = target ? target.textContent : 'Search result';
        //tvShowsHead.style.cssText = 'color: red; border-bottom: 2px solid red'
        tvShowsHead.style.color = 'green';
        
    response.results.forEach(item =>{
        const {
            backdrop_path: backdrop,
            name: title,
            poster_path: poster,
            vote_average: vote,
            id
        } = item;

        //console.log(item);
        //console.log(vote);

        const posterImg = poster ?  IMG_URL + poster : `img/no-poster.jpg`;
        const backdropImg=backdrop ? IMG_URL + backdrop : '';
        //let voteStyle =vote.closest('.tv-card span').visiblity='hidden';
        const voteElem = vote ? `<span class="tv-card__vote">${vote}</span>` : '';
        //document.getElementsByClassName('tv-card__vote'); console.log(voteElem)
       

        const card = document.createElement('li');
        console.dir(card);
        card.idTV = id;
        card.classList.add(".tv-shows__item");
        card.className = 'tv-shows__item';
        card.innerHTML = `
            <a href="#" id="${id}" class="tv-card">
                ${voteElem}
                <img class="tv-card__img"
                src="${posterImg}"
                data-backdrop="${IMG_URL + backdrop}"
                alt="${title}">
                <h4 class="tv-card__head">"${title}"</h4>
            </a>`;
        loading.remove();
        tvShowList.append(card);
        tvShowList.prepend(card);
        //console.log(card);
    });

    pagination.textContent = '';
    if(!target && response.total_pages > 1){
        for(let i = 1; i <= response.total_pages; i++){
            pagination.innerHTML += `<li><a href="#" class="pages">${i}</a></li>`;
        }
    }
};
searchForm.addEventListener('submit', event =>{
    event.preventDefault();    
    const value = searchFormInput.value.trim();
    if(value){
        tvShows.append(loading);
        new DBservice().getSearchResult(value).then(renderCard);
        console.log(value);
    }
    searchFormInput.value = "";    
    
});
   



// open or close menu
const closeDropdown = () =>{
    dropdown.forEach(item =>{
        item.classList.remove('.active');
    })
}

hamburger.addEventListener('click', () =>{
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
    closeDropdown();
});
//console.dir
document.body.addEventListener('click', event =>{
//console.log(event)
if(!event.target.closest('.left-menu')){
//console.log('click out menu');
    leftMenu.classList.remove('openMenu');
    hamburger.classList.remove('open');
    closeDropdown();
}

});
leftMenu.addEventListener('click', event =>{
    event.preventDefault();
    const target = event.target;
    const dropdown = target.closest('.dropdown');
    if(dropdown){
       dropdown.classList.toggle('active');
       leftMenu.classList.add('openMenu');
       hamburger.classList.add('open');
    }

    // string 71 => const dbService = new DBservice();
    if(target.closest('#top-rated')){
        console.log('top-rated');
        dbService.getTopRated().then((response) => renderCard(response, target));
    }
    if(target.closest('#popular')){
        console.log('popular');
        dbService.getPopular().then((response) => renderCard(response, target));
    }
    if(target.closest('#week')){
        console.log('week');
        dbService.getWeek().then((response) => renderCard(response, target));
    }
    if(target.closest('#today')){
        console.log('today');
        dbService.getToday().then((response) => renderCard(response, target));
    }
    if(target.closest('#search')){
        tvShowList.textContent = '';
        tvShowsHead.textContent = '';
    }

});

//open modal window


tvShowList.addEventListener('click', event =>{
    event.preventDefault(true);
    const target = event.target;
    const card = target.closest('.tv-card');
    //console.log(target);
    if(card){

        preloader.style.display = 'block';

        new DBservice().getTvShow(card.id)
        .then(data =>{
            console.log(data);

            if(data.poster_path){
                tvCardImg.src =  IMG_URL + data.poster_path;
                tvCardImg.alt =  data.name;
                posterWrapper.style.display = '';
                modalContent.style.paddingLeft = '';
            }else{
                posterWrapper.style.display = 'none';
                modalContent.style.paddingLeft = '25px';
            }

            
            modalTitle.textContent = data.name;
            //genresList.innerHTML = data.genres.reduse((acc, item) => `${acc} <li>${item.name}</li>`, '')
            /*genresList.textContent = '';
            for(const item of data.genres){
                genresList.innerHTML += `<li>${item.name}</li>`;
            }*/
            data.genres.forEach(item =>{
                genresList.innerHTML += `<li>${item.name}</li>`;
            })
            rating.textContent = data.vote_average;  
            description.textContent = data.overview;  
            modalLink.href = data.homepage
        })
        .then(() =>{
            document.body.style.overflow = 'hidden';
            modal.classList.remove('hide');
        })
        .finally(() =>{
            console.log('hey hey');
            preloader.style.display = 'none';
        })

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
pagination.addEventListener('click', event =>{
    event.preventDefault();
    const targrt = event.target;
    if(target.classList.contains('pages')){
        tvShow.append(loading);
        dbService.getNextPage(target.textContent).then(renderCard);
    }
});



