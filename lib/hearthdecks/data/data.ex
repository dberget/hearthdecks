defmodule Hearthdecks.Data do
  import Ecto.Query, warn: false
  alias Hearthdecks.Repo
  alias Hearthdecks.Data.{Card, Deck}

  def list_cards do
    Repo.all(Card)
  end

  def card_by_dbfId(dbfId) do
    q = from(c in Card, where: c.dbfId == ^dbfId, select: c)

    Repo.all(q)
  end

  def get_card!(id), do: Repo.get!(Card, id)

  def create_card(attrs \\ %{}) do
    %Card{}
    |> Card.changeset(attrs)
    |> Repo.insert()
  end

  def update_card(%Card{} = card, attrs) do
    card
    |> Card.changeset(attrs)
    |> Repo.update()
  end

  def update_for_wild(%Card{} = card, attrs) do
    card
    |> Card.changeset(attrs)
    |> Repo.update()
  end

  def delete_card(%Card{} = card) do
    Repo.delete(card)
  end

  def change_card(%Card{} = card) do
    Card.changeset(card, %{})
  end

  def list_decks do
    Repo.all(Deck)
  end

  def get_deck!(id), do: Repo.get!(Deck, id)

  def create_deck(attrs \\ %{}) do
    %Deck{}
    |> Deck.changeset(attrs)
    |> Repo.insert()
  end

  def update_deck(%Deck{} = deck, attrs) do
    deck
    |> Deck.changeset(attrs)
    |> Repo.update()
  end

  def delete_deck(%Deck{} = deck) do
    Repo.delete(deck)
  end

  def change_deck(%Deck{} = deck) do
    Deck.changeset(deck, %{})
  end
end
