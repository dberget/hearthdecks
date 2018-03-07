# Hearthdecks

Live Site: www.hearthdecks.daveberget.com

Hearthstone deck building site that allows users to create, share, and export decks for use into the game.

### Installing

To start your Phoenix server:

* Install dependencies with `mix deps.get`
* Create and migrate your database with `mix ecto.create && mix ecto.migrate`
* Install Node.js dependencies with `cd assets && npm install`
* Start IEX and Phoenix endpoint with `iex -S mix phx.server`
* In iex, run `Hearthdecks.Tasks.CardUpload.run` to upload current Hearthstone cards.

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## Built With

* [Elixir](https://elixir-lang.org/)
* [Phoenix](https://www.phoenixframework.org)
* [Brunch.io](http://brunch.io/)
* [Reactjs](https://reactjs.org/)
* [React-Router](https://reacttraining.com/react-router/)
* [Semantic-UI-React](https://www.react.semantic-ui.com)

## Acknowledgements

* [npm-deckstrings](https://github.com/HearthSim/npm-deckstrings)
* [HearthstoneAPI](http://hearthstoneapi.com/)

## Authors

* **David Berget**
