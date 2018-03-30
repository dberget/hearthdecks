defmodule HearthdecksWeb.CardControllerTest do
  use HearthdecksWeb.ConnCase

  describe "Card Controller" do
    alias Hearthdecks.Data

    @valid_attrs %{
      attack: 8,
      cardId: "CS2_041",
      cardSet: "Basic",
      collectible: true,
      cost: 0,
      dbfId: "149",
      faction: "Neutral",
      health: nil,
      id: 10,
      img: "http://media.services.zam.com/v1/media/byName/hs/cards/enus/CS2_041.png",
      imgGold:
        "http://media.services.zam.com/v1/media/byName/hs/cards/enus/animated/CS2_041_premium.gif",
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
    @update_attrs %{
      attack: 5,
      cardId: "CS2_041",
      cardSet: "Basic",
      collectible: true,
      cost: 3,
      dbfId: "149",
      faction: "Neutral",
      health: nil,
      id: 10,
      img: "http://media.services.zam.com/v1/media/byName/hs/cards/enus/CS2_041.png",
      imgGold:
        "http://media.services.zam.com/v1/media/byName/hs/cards/enus/animated/CS2_041_premium.gif",
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
    @invalid_attrs %{
      attack: nil,
      cardId: "CS2_041",
      cardSet: "Basic",
      collectible: true,
      cost: 0,
      dbfId: nil,
      faction: "Neutral",
      health: nil,
      id: 10,
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

    test "#index renders a page of cards" do
      conn = get(build_conn(), "/new/cards")

      assert json_response(conn, 200) == %{
               "entries" => [],
               "page_number" => 1,
               "page_size" => 8,
               "total_entries" => 0,
               "total_pages" => 1
             }
    end

    test "#index with filter params renders page of cards" do
      conn =
        get(build_conn(), "/new/cards", %{
          "class" => "Warrior",
          "expansion" => "Knights of the Frozen Throne",
          "page" => "2"
        })

      assert json_response(conn, 200) == %{
               "entries" => [],
               "page_number" => 2,
               "page_size" => 8,
               "total_entries" => 0,
               "total_pages" => 1
             }
    end

    test "#shared selects list of cards" do
      card = card_fixture(@valid_attrs)

      conn =
        get(build_conn(), "/shared", %{
          "cards" =>
            "180,40437,1158,365,38391,268,459,42801,42011,38393,47035,710,39698,41222,282,41216",
          "counts" => "2,2,2,2,2,2,2,2,2,2,1,2,2,1,2,2"
        })

      # assert json_response(conn, 200) == %{"entries" => [[card]]}
    end

    test "#upload/cards returns list of cards from dbfid" do
      card = card_fixture(@valid_attrs)

      conn =
        get(build_conn(), "/upload/cards", %{
          "cards" =>
            "41856,974,41876,38447,38454,163,469,982,43128,1090,43122,39740,1092,38774,45321,48,41872"
        })

      # assert json_response(conn, 200) == %{"entries" => [card]}
    end
  end
end
