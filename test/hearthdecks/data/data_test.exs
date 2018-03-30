defmodule Hearthdecks.DataTest do
  use Hearthdecks.DataCase

  alias Hearthdecks.Data

  describe "Card" do
    alias Hearthdecks.Data.Card

    @valid_attrs %{
      "attack" => nil,
      "cardId" => "NEW1_003",
      "cardSet" => "Basic",
      "cost" => 0,
      "dbfId" => "163",
      "faction" => nil,
      "health" => nil,
      "img" => "http://media.services.zam.com/v1/media/byName/hs/cards/enus/NEW1_003.png",
      "name" => "Sacrificial Pact",
      "playerClass" => "Warlock",
      "rarity" => "Free",
      "text" => "Destroy a Demon. Restore #5 Health to your hero.",
      "standard" => false,
      "type" => "Spell"
    }
    @update_attrs %{
      "attack" => nil,
      "cardId" => "NEW1_004",
      "cardSet" => "Basic",
      "cost" => 0,
      "dbfId" => "163",
      "faction" => nil,
      "health" => nil,
      "img" => "http://media.services.zam.com/v1/media/byName/hs/cards/enus/NEW1_003.png",
      "name" => "Sacrificial Pact",
      "playerClass" => "Warlock",
      "rarity" => "Free",
      "text" => "Destroy a Demon. Restore #5 Health to your hero.",
      "type" => "Spell"
    }
    @invalid_attrs %{
      attack: nil,
      cardId: "CS2_041",
      cardSet: "Basic",
      collectible: true,
      cost: 0,
      dbfId: nil,
      faction: "Neutral",
      health: nil,
      img: nil,
      imgGold: nil,
      inserted_at: ~N[2017-12-12 05:10:29.722735],
      name: "Ancestral Healing",
      playerClass: "Shaman",
      race: nil,
      rarity: "Free",
      standard: true,
      text: "Restore a minion\\nto full Health and\\ngive it <b>Taunt</b>.",
      type: "Spell",
      updated_at: ~N[2017-12-12 05:10:42.319603]
    }

    def card_fixture(attrs \\ %{}) do
      {:ok, card} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Data.create_card()

      card
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

    test "delete_card/1 deletes the card" do
      card = card_fixture()
      assert {:ok, %Card{}} = Data.delete_card(card)
      assert_raise Ecto.NoResultsError, fn -> Data.get_card!(card.id) end
    end
  end

  describe "decks" do
    alias Hearthdecks.Data.Deck

    @valid_attrs %{
      deckstring: "AAEBAQcE/wPx0wKdAqK8Ag26zgKGsALYAoe/ArnDAszDAqIE/ASQA43SAr7DApEGuMMCAA=="
    }
    @update_attrs %{
      deckstring: "AAEBAQcE/wPx0wKdAqK8Ag26zgKGsALYAoe/ArnDAszDAvwEkAON0gK+wwKRBrjDAo4FAA=="
    }
    @invalid_attrs %{deckstring: nil}

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
