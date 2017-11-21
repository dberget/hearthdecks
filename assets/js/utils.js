import React from 'react'
import { Message } from 'semantic-ui-react'

export const countDeck = (deck) => {
    if (deck.length == 0) {
      var deckCount = 0;
    } else {
     var deckCount = deck.map(x => x.count).reduce(function (sum, value) {
        return sum + value;
      }, 0)
    }
    return deckCount;
  }
  
 export const countCard = (card, deck) => { 
    var count = 0

    for (var i = 0; i < deck.length; ++i) {
      if (deck[i].name == card.name)
        count++;
    }
    return count;
  }

  export function flash_notice(message) {
    let notice = $('<div></div>').attr('id', 'flash_notice').html(message);
    notice.css('position', 'absolute');
    notice.css('z-index', 1050);
    $('body').append(notice.hide());
    notice.css('left', ($('body').width() / 2) - (notice.width() / 2)) + 'px';
    notice.css('top', $(window).scrollTop() + 'px');
    notice.fadeIn();

    function remove_notice() { notice.fadeOut(function() { notice.remove() }); }
    setTimeout(remove_notice, 3000);
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
  