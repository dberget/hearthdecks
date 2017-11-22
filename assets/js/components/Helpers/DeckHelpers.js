import {encodeQueryData} from './ApiHelpers'

export function processDeck(deck) {
    var dbfids = []
    var cards = deck.cards

    for (var i = 0; i < cards.length; ++i) {
        dbfids.push(cards[i][0])
    }

    return dbfids;
}


export function addCount(userDeck, deck) {
    for (var i = 0; i < userDeck.length; ++i) {
        for (var c = 0; c < deck.length; ++c) {
            if (userDeck[i][0] == deck[c].dbfId) {
                deck[c].count = userDeck[i][1]
            }
        }
    }

    return deck;
}