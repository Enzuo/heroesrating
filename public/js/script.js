var heroes;

function init(){
  $.getJSON('js/heroes.json', function(data) {
    heroes = data
    displayHeroes()
  })
}

function displayHeroes(){
  var indexes = uniqueRandom(heroes.length)
  console.log(indexes)

  var heroesDiv = document.getElementById('heroes')
  heroesDiv.innerHTML = ''

  for(var i=0; i < indexes.length; i++) {
    var index = indexes[i]
    var heroContainer = document.createElement('div')
    heroContainer.className = 'hero'
    var heroCard = createHeroCard(heroes[index])
    heroCard.setAttribute('index', index)
    heroCard.addEventListener('click', clickHero)
    heroContainer.appendChild(heroCard)
    appendHeroTimeout(heroesDiv, heroContainer, i*150)
  }
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

function clickHero(event, b){
  console.log('clickHero', event, b)
  console.log(this, this.getAttribute('index'))
  // displayHeroes()
  var index = this.getAttribute('index')
  var cards = document.getElementsByClassName('hero-card')
  for(var i=0; i<cards.length; i++){
    if(cards[i].getAttribute('index') !== index){
      cards[i].className = 'hero-card unselected'
    }
  }
  this.className = 'hero-card selected'
  setTimeout(function(){
    displayHeroes();
  }, 500)
}

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





init();