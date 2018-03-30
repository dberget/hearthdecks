defmodule Hearthdecks.CardsTest do
  use Hearthdecks.DataCase
  alias Hearthdecks.Data
  alias Hearthdecks.Data.Card

  # param_defaults %{playerClass: nil, search: nil, page: 1, cardSet: nil, standard: true, cost: nil}

  describe "Cards" do
    alias Hearthdecks.Cards

    test "Mage playerClass param returns card list of only mage cards" do
      filter_params = %{playerClass: "Mage"}
      result = Cards.all(filter_params)
      cards = result.entries

      Enum.each(cards, &assert(&1.playerClass == "Mage"))
    end

    test "nil playerClass param returns card list of Neutral Minions" do
      filter_params = %{playerClass: nil}
      result = Cards.all(filter_params)
      cards = result.entries

      Enum.each(cards, &assert(&1.playerClass == "Neutral"))
    end

    test "blank playerClass param returns card list of Neutral Minions" do
      filter_params = %{playerClass: ""}
      result = Cards.all(filter_params)
      cards = result.entries

      Enum.each(cards, &assert(&1.playerClass == "Neutral"))
    end

    test "searching by mana cost only returns cards of that mana value" do
      filter_params = %{cost: 1}
      result = Cards.all(filter_params)
      cards = result.entries

      Enum.each(cards, &assert(&1.cost == 1))
    end

    test "searching for cards that cost 7+ returns all 7+ mana cost cards" do
      filter_params = %{cost: "7+"}
      result = Cards.all(filter_params)
      cards = result.entries

      seven_cost_cards = Enum.filter(cards, &(&1.cost == 7))
      eight_cost_cards = Enum.filter(cards, &(&1.cost == 8))
      nine_cost_cards = Enum.filter(cards, &(&1.cost == 9))
      ten_or_more_cost_cards = Enum.filter(cards, &(&1.cost >= 10))

      Enum.each(seven_cost_cards, &assert(&1.cost == 7))
      Enum.each(eight_cost_cards, &assert(&1.cost == 8))
      Enum.each(nine_cost_cards, &assert(&1.cost == 10))
      Enum.each(ten_or_more_cost_cards, &assert(&1.cost >= 10))
    end

    test "searching for a mana cost 7 or greater returns no cards lower than 7" do
      filter_params = %{cost: 9}
      result = Cards.all(filter_params)
      cards = result.entries

      Enum.each(cards, &refute(&1.cost < 7))
    end

    test "Select cards by list of dbfId's" do
      result = Cards.select(["149", "151"])
      [card_1, card_2] = result.entries

      assert card_1.dbfId == "149"
      assert card_2.dbfId == "151"
    end
  end
end
