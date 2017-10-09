defmodule HearthdecksWeb.CardController do
    use HearthdecksWeb, :controller
    alias Hearthdecks.Cards
  
    @standard ["Basic", "Classic", "Journey to Un'Goro","Knights of the Frozen Throne", "Mean Streets of Gadgetzan", "One Night in Karazhan", "Whispers of the Old Gods"]

    def index(conn, params) do
      IO.inspect(params)
      page = 
        params
        |> index_filters
        |> Cards.all
  
      send_resp(conn, 200, format_json(page))
    end
  
    def format_json(page) do
      entries = Enum.map(page.entries, &format_card/1)
  
      json = %{
        entries: entries,
        page_number: page.page_number,
        page_size: page.page_size,
        total_pages: page.total_pages,
        total_entries: page.total_entries
      }

      Poison.encode!(json)
    end

    defp current_page(params), do: Map.get(params, "page", 1)
  
    def format_card(card) do
      card
      |> Map.take([:id, :cardId, :dbfId, :cardSet, :type, :faction, :rarity, :text, :attack, :health, :name, :playerClass, :cost, :img])
    end

    defp standard(params), do: Map.get(params, "standard", true)
    defp search(params), do: Map.get(params, "search", nil)

    defp expansion(%{"expansion" => "all"}), do: @standard
    defp expansion(params), do: Map.get(params, "expansion", @standard)

    defp class(params), do: Map.get(params, "class")
  
    defp index_filters(params) do
      %{
        page: current_page(params),
        search: search(params),
        filters: %{
          playerClass: class(params),
          standard: standard(params),
          cardSet: expansion(params),
        }
      }
    end
  end
  