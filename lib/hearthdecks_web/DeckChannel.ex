defmodule HearthdecksWeb.DeckChannel do
  use HearthdecksWeb, :channel
  alias Hearthdecks.Data

  def join("room", _params, socket) do
        {:ok, socket}
  end

  def handle_in("create_deck", deckstring, socket) do
          Data.create_deck(%{deckstring: deckstring})
        {:noreply, socket}
  end
end
