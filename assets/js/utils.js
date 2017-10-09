export function countDeck(deck){
    if (deck.length == 0) {
      var deckCount = 0;
    } else {
     var deckCount = deck.map(x => x.count).reduce(function (sum, value) {
        return sum + value;
      }, 0)
    }
    return deckCount;
  }
  
 export function countCard(card, deck){
    var count = 0
    for (var i = 0; i < deck.length; ++i) {
      if (deck[i].name == card.name)
        count++;
    }
    return count;
  }

  export const sortDeck = (a, b) => {
    if (a.cost < b.cost) {
      return -1;
    }
    if (a.cost > b.cost) {
      return 1;
    }
  
    if (a.cost == b.cost) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }
  };
  