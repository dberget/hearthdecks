defmodule Hearthdecks.Data.Deck do
  use Ecto.Schema
  import Ecto.Changeset
  alias Hearthdecks.Data.Deck

  schema "decks" do
    field(:deckstring, :string)
    timestamps()
  end

  def changeset(%Deck{} = deck, attrs) do
    deck
    |> cast(attrs, [:deckstring])
    |> validate_required([:deckstring])
  end
end
