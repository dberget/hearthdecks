defmodule HearthdecksWeb.CardController do
  use HearthdecksWeb, :controller
  alias Hearthdecks.Cards

  @standard Application.get_env(:hearthdecks, :standard)
  @wild Application.get_env(:hearthdecks, :wild)

  def index(conn, params) do
    page =
      params
      |> index_filters
      |> Cards.all()

    render(conn, "index.json", page: page)
  end

  def shared(conn, params) do
    counts =
      String.split(params["counts"], ",")
      |> Enum.into([], &String.to_integer/1)

    cards =
      params
      |> split_cards
      |> Cards.select()

    deck = Enum.zip(cards.entries, counts)

    render(conn, "shared_deck.json", deck: deck)
  end

  def dbfid(conn, params) do
    deck =
      params
      |> split_cards
      |> Cards.select()

    render(conn, "card_select.json", deck: deck)
  end

  def class(conn, params) do
    page =
      params
      |> index_filters
      |> Cards.all()

    render(conn, "index.json", page: page)
  end

  defp split_cards(params), do: String.split(params["cards"], ",")

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
