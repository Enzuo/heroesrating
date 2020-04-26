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
    heroContainer.appendChild(heroCard)
    heroesDiv.appendChild(heroContainer)
  }
}

function createHeroCard(hero){
  var heroCard = document.createElement('div')
  heroCard.className = 'hero-card'

  var heroPortrait = document.createElement('div')
  heroPortrait.className = 'hero-portrait'
  var heroPortraitImg = document.createElement('img')
  heroPortraitImg.setAttribute('src', 'img/'+hero.name.replace(' ', '_')+'_Hero_Portrait.png')
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