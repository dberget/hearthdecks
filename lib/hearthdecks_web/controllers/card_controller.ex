defmodule HearthdecksWeb.CardController do
    use HearthdecksWeb, :controller
    alias Hearthdecks.Cards
  
    @standard ["Basic", "Classic", "Journey to Un'Goro","Knights of the Frozen Throne", "Mean Streets of Gadgetzan", "One Night in Karazhan", "Whispers of the Old Gods"]

    @wild ["Basic", "Blackrock Mountain", "Classic",
    "Goblins vs Gnomes", "Hall of Fame", "Journey to Un'Goro",
    "Knights of the Frozen Throne", "Mean Streets of Gadgetzan",
    "Naxxramas", "One Night in Karazhan",
    "The Grand Tournament", "The League of Explorers",
    "Whispers of the Old Gods"]

    def index(conn, params) do
      page = 
        params
        |> index_filters
        |> Cards.all
  
      render conn, "index.json", page: page
    end

    def dbfid(conn, params) do
      deck = 
        params
        |> split 
        |> Cards.select
  
      render conn, "card_select.json", deck: deck
    end

    defp split(params), do: String.split(params["dbfids"], ",")

    defp current_page(params), do: Map.get(params, "page", 1)

    defp search(params), do: Map.get(params, "search", nil)

    defp standard(%{"expansion" => expansion}) when expansion in @standard, do: true
    defp standard(%{"expansion" => expansion}) when expansion in @wild, do: false
    defp standard(%{"expansion" => "standard"}), do: true
    defp standard(%{"expansion" => "wild"}), do: false
    defp standard(_), do: true

    defp expansion(%{"expansion" => "standard"}), do: nil
    defp expansion(%{"expansion" => "wild"}), do: nil
    defp expansion(params), do: Map.get(params, "expansion", nil)

    defp class(params), do: Map.get(params, "class", "Neutral")
  
    defp index_filters(params) do
      %{
        page: current_page(params),
        search: search(params),
        standard: standard(params),
        cardSet: expansion(params),
        playerClass: class(params),
        cost: params["cost"]
      }
    end
  end
  