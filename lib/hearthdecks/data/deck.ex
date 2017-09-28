defmodule Hearthdecks.Data.Deck do
  use Ecto.Schema
  import Ecto.Changeset
  alias Hearthdecks.Data.Deck


  schema "decks" do
      field :name, :string
      field :cards, :map
    timestamps()
  end

  @doc false
  def changeset(%Deck{} = deck, attrs) do
    deck
    |> cast(attrs, [])
    |> validate_required([])
  end
end
