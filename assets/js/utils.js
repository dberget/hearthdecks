export const sum = (acc, cv) => acc + cv

export const countDeck = (deck) => {
  let deckCount = 0
  if (deck.length === 0) {
    deckCount = 0
  } else {
    deckCount = deck.map(x => x.count).reduce((sum), 0)
  }
  return deckCount
}

export const countCard = (card, deck) => {
  let count = 0
  for (let i = 0; i < deck.length; i += 1) {
    if (deck[i].name === card.name) {
      count += 1
    }
  }
  return count
}

export function flashNotice(message) {
  const notice = $('<div></div>').attr('id', 'flash_notice').html(message)
  notice.css('position', 'absolute')
  notice.css('z-index', 1050)
  $('body').append(notice.hide())
  notice.css('left', ($('body').width() / 2) - (notice.width() / 2)) + 'px';
  notice.css('top', $(window).scrollTop() + 'px')
  notice.fadeIn()

  function removeNotice() { notice.fadeOut(function () { notice.remove() }) }
  setTimeout(removeNotice, 3000)
}

export const sortDeck = (a, b) => {
  if (a.cost < b.cost) {
    return -1
  }
  if (a.cost > b.cost) {
    return 1
  }

  if (a.cost === b.cost) {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  }
}
