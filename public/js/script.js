var heroesData
var roundTimer
var hoverTimer
var heroesRound
var idUser = window.localStorage.getItem('idUser')

function init(){
  if(!idUser){
    idUser = Date.now()
    window.localStorage.setItem('idUser', idUser)
  }

  $.getJSON('js/heroes.json', function(data) {
    heroesData = data
    pickHeroRound()
  })
}

function pickHeroRound(){
  var indexes = uniqueRandom(heroesData.length)
  heroesRound = toHeroesObject(indexes)
  
  var heroesDiv = document.getElementById('heroes')
  heroesDiv.innerHTML = ''

  for(var i=0; i < indexes.length; i++) {
    var index = indexes[i]
    var heroContainer = document.createElement('div')
    heroContainer.className = 'hero'

    var heroCard = createHeroCard(heroesData[index])
    heroCard.setAttribute('index', index)
    heroCard.addEventListener('click', clickHero)
    heroCard.addEventListener('mouseenter', hoverHero)
    heroCard.addEventListener('mouseleave', hoverHeroEnd)

    heroContainer.appendChild(heroCard)
    appendHeroTimeout(heroesDiv, heroContainer, i*150)
  }

  /* reset timers */
  roundTimer = Date.now();
  hoverTimer = null;
}

function appendHeroTimeout(div, hero, time){
  setTimeout(function(){
    div.appendChild(hero)
  }, time);
}

function createHeroCard(hero){
  var heroCard = document.createElement('div')
  heroCard.className = 'hero-card'

  var heroPortrait = document.createElement('div')
  heroPortrait.className = 'hero-portrait'
  var heroPortraitImg = document.createElement('img')
  heroPortraitImg.setAttribute('src', 'img/'+hero.name.replace(/ /g, '_')+'_Hero_Portrait.png')
  var heroPortraitAnim = document.createElement('div')
  heroPortraitAnim.className = 'star-anim'
  heroPortraitAnim.innerHTML = '<object type="image/svg+xml" data="svg/stars.svg"></object>'
  heroPortrait.appendChild(heroPortraitImg)
  heroPortrait.appendChild(heroPortraitAnim)

  var heroName = document.createElement('div')
  heroName.className = 'hero-name'
  heroName.innerHTML = hero.name

  var heroType = document.createElement('div')
  heroType.className = 'hero-type'
  heroType.innerHTML = hero.type

  heroCard.appendChild(heroPortrait)
  heroCard.appendChild(heroName)
  heroCard.appendChild(heroType)
  return heroCard;
}

function sendResult(selectedIndex){
  heroesRound[selectedIndex].selected = true
  roundTime = Date.now() - roundTimer 
  var data = {
    heroes: heroesRound, 
    roundTime: roundTime, 
    idUser: idUser
  }

  var request = new XMLHttpRequest();
  request.open('POST', '/', true);
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  request.send(JSON.stringify(data));
}

/** 
 * Events 
 * */
function clickHero(event, b){
  var index = this.getAttribute('index')
  /* anim */
  var cards = document.getElementsByClassName('hero-card')
  for(var i=0; i<cards.length; i++){
    if(cards[i].getAttribute('index') !== index){
      cards[i].className = 'hero-card unselected'
    }
  }
  this.className = 'hero-card selected'
  
  /* result */
  hoverHeroEnd.bind(this)()
  sendResult(index)

  /* new round */
  setTimeout(function(){
    pickHeroRound();
  }, 500)
}

function hoverHero(){
  hoverTimer = Date.now()
}

function hoverHeroEnd(){
  if(hoverTimer){
    var index = this.getAttribute('index')
    heroesRound[index].hoverTimer += (Date.now() - hoverTimer) 
    hoverTimer = null
  }
}


/** 
 * Helpers 
 * */
function uniqueRandom(length){
  var nb=3
  var res=[]
  while(res.length < nb){
    var randomNumber = Math.floor(Math.random()*length);
    if(res.indexOf(randomNumber) === -1){
      res.push(randomNumber)
    }
  }
  return res
}

function toHeroesObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    rv[arr[i]] = { hoverTimer:0 };
  return rv;
}





init();