defmodule Hearthdecks.Data.Card do
  use Ecto.Schema
  import Ecto.Changeset
  alias Hearthdecks.Data.Card

  schema "cards" do
    field :cardId, :string
    field :dbfId, :string
    field :name, :string
    field :cardSet, :string
    field :type, :string
    field :faction, :string
    field :img, :string
    field :imgGold, :string
    field :playerClass, :string
    field :rarity, :string
    field :collectible, :boolean
    field :cost, :integer
    field :text, :string
    field :attack, :integer
    field :health, :integer
    field :standard, :boolean

    timestamps()
  end

  @doc false
  def changeset(%Card{} = card, attrs) do
    card
    |> cast(attrs, [:cardId, :standard, :dbfId, :name, :cardSet, :type, :faction, :img, :imgGold, :playerClass, :rarity, :collectible, :cost, :text, :attack, :health])
    |> validate_required([])
  end
end
