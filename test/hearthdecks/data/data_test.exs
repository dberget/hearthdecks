defmodule Hearthdecks.DataTest do
  use Hearthdecks.DataCase

  alias Hearthdecks.Data

  describe "cards" do
    alias Hearthdecks.Data.Card

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def card_fixture(attrs \\ %{}) do
      {:ok, card} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Data.create_card()

      card
    end

    test "list_cards/0 returns all cards" do
      card = card_fixture()
      assert Data.list_cards() == [card]
    end

    test "get_card!/1 returns the card with given id" do
      card = card_fixture()
      assert Data.get_card!(card.id) == card
    end

    test "create_card/1 with valid data creates a card" do
      assert {:ok, %Card{} = card} = Data.create_card(@valid_attrs)
    end

    test "create_card/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Data.create_card(@invalid_attrs)
    end

    test "update_card/2 with valid data updates the card" do
      card = card_fixture()
      assert {:ok, card} = Data.update_card(card, @update_attrs)
      assert %Card{} = card
    end

    test "update_card/2 with invalid data returns error changeset" do
      card = card_fixture()
      assert {:error, %Ecto.Changeset{}} = Data.update_card(card, @invalid_attrs)
      assert card == Data.get_card!(card.id)
    end

    test "delete_card/1 deletes the card" do
      card = card_fixture()
      assert {:ok, %Card{}} = Data.delete_card(card)
      assert_raise Ecto.NoResultsError, fn -> Data.get_card!(card.id) end
    end

    test "change_card/1 returns a card changeset" do
      card = card_fixture()
      assert %Ecto.Changeset{} = Data.change_card(card)
    end
  end

  describe "decks" do
    alias Hearthdecks.Data.Deck

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def deck_fixture(attrs \\ %{}) do
      {:ok, deck} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Data.create_deck()

      deck
    end

    test "list_decks/0 returns all decks" do
      deck = deck_fixture()
      assert Data.list_decks() == [deck]
    end

    test "get_deck!/1 returns the deck with given id" do
      deck = deck_fixture()
      assert Data.get_deck!(deck.id) == deck
    end

    test "create_deck/1 with valid data creates a deck" do
      assert {:ok, %Deck{} = deck} = Data.create_deck(@valid_attrs)
    end

    test "create_deck/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Data.create_deck(@invalid_attrs)
    end

    test "update_deck/2 with valid data updates the deck" do
      deck = deck_fixture()
      assert {:ok, deck} = Data.update_deck(deck, @update_attrs)
      assert %Deck{} = deck
    end

    test "update_deck/2 with invalid data returns error changeset" do
      deck = deck_fixture()
      assert {:error, %Ecto.Changeset{}} = Data.update_deck(deck, @invalid_attrs)
      assert deck == Data.get_deck!(deck.id)
    end

    test "delete_deck/1 deletes the deck" do
      deck = deck_fixture()
      assert {:ok, %Deck{}} = Data.delete_deck(deck)
      assert_raise Ecto.NoResultsError, fn -> Data.get_deck!(deck.id) end
    end

    test "change_deck/1 returns a deck changeset" do
      deck = deck_fixture()
      assert %Ecto.Changeset{} = Data.change_deck(deck)
    end
  end
end
