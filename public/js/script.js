var heroes;

function init(){
  $.getJSON('js/heroes.json', function(data) {
    heroes = data
  })
}




init();