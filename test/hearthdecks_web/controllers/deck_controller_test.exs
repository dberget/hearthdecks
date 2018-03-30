defmodule HearthdecksWeb.DeckControllerTest do
  use HearthdecksWeb.ConnCase

  alias Hearthdecks.Data

  @create_attrs %{
    deckstring: "AAEBAQcE/wPx0wKdAqK8Ag26zgKGsALYAoe/ArnDAszDAqIE/ASQA43SAr7DApEGuMMCAA=="
  }
  @update_attrs %{
    deckstring: "AAEBAQcE/wPx0wKdAqK8Ag26zgKGsALYAoe/ArnDAszDAvwEkAON0gK+wwKRBrjDAo4FAA=="
  }
  @invalid_attrs %{
    deckstring: "AAEBAQcE/wPx0wKdAqK8Ag26zgKGsALYAoe/ArnDAszDAqIE/ASQA43SAr7DApEGuMMCAA=="
  }

  def fixture(:deck) do
    {:ok, deck} = Data.create_deck(@create_attrs)
    deck
  end

  defp create_deck(_) do
    deck = fixture(:deck)
    {:ok, deck: deck}
  end
end
