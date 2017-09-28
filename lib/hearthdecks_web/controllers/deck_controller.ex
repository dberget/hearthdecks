defmodule HearthdecksWeb.DeckController do
    use HearthdecksWeb, :controller
    alias Hearthdecks.Cards
  
    def index(conn, params) do
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
  
  
    defp class(%{"class" => ""}), do: [] 
    defp class(params) do
      params
      |> Map.get("class", "Neutral")
    end
  
    defp index_filters(params) do
      %{
        page: current_page(params),
        filters: %{
          playerClass: class(params),
        }
      }
    end
  end
  