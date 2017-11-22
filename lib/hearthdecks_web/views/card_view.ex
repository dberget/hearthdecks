defmodule HearthdecksWeb.CardView do
   use HearthdecksWeb, :view

  def render("index.json", %{page: page}) do
    %{
        entries: Enum.map(page.entries, &format_card/1),
        page_number: page.page_number,
        page_size: page.page_size,
        total_pages: page.total_pages,
        total_entries: page.total_entries
      }
  end

  def render("card_select.json", %{deck: deck}) do
    %{
        entries: Enum.map(deck.entries, &format_card/1),
      }
  end

  def format_card(card) do
    card
    |> Map.take([:id, :cardId, :dbfId, :cardSet, :type, :faction, :rarity, :text, :attack, :health, :name, :playerClass, :cost, :img])
  end

end