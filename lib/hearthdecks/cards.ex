defmodule Hearthdecks.Cards do
  alias Hearthdecks.{Repo, Data.Card}
  import Ecto.Query

  @defaults %{
    playerClass: nil,
    search: nil,
    page: 1,
    cardSet: nil,
    standard: true,
    cost: nil
  }

  def all(opts \\ %{}) do
    opts = Map.merge(@defaults, opts)

    Card
    |> search_query(opts.search)
    |> standard(opts.standard)
    |> mana(opts.cost)
    |> player_class(opts.playerClass)
    |> card_set(opts.cardSet)
    |> order_by(:cost)
    |> order_by(:name)
    |> Repo.paginate(page: opts.page, page_size: 8)
  end

  def select(ids) do
    Card
    |> by_dbfid(ids)
    |> Repo.paginate(page: 1, page_size: 30)
  end

  defp by_dbfid(q, ids) do
    from(c in q, where: c.dbfId in ^ids)
  end

  def standard(q, false), do: q
  def standard(q, true), do: from(c in q, where: [standard: true])

  def card_set(q, nil), do: q
  def card_set(q, set), do: from(c in q, where: [cardSet: ^set])

  def mana(q, "7+"), do: from(c in q, where: c.cost > 6)
  def mana(q, "<1"), do: from(c in q, where: c.cost < 1)
  def mana(q, nil), do: q
  def mana(q, mana), do: from(c in q, where: [cost: ^mana])

  def player_class(q, nil), do: from(c in q, where: [playerClass: "Neutral"])
  def player_class(q, ""), do: from(c in q, where: [playerClass: "Neutral"])
  def player_class(q, class), do: from(c in q, where: [playerClass: ^class])

  def search_query(q, nil), do: q
  def search_query(q, %{"search" => "undefined"}), do: q

  def search_query(query, t) do
    from(
      c in query,
      where: ilike(c.name, ^"%#{t}%"),
      or_where: ilike(c.text, ^"%#{t}%"),
      or_where: ilike(c.race, ^"%#{t}%"),
      or_where: ilike(c.rarity, ^"%#{t}%")
    )
  end
end
