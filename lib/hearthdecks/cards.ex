defmodule Hearthdecks.Cards do
    alias Hearthdecks.{Repo, Data.Card}
    import Ecto.Query

    @defaults %{playerClass: nil, search: nil, page: 1, cardSet: nil, standard: true, cost: nil}

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
        |> IO.inspect
        |> Repo.paginate(page: opts.page, page_size: 8)
    end

    # defp filter({field, value}, query) when is_list(value), do: where(query, [o], field(o, ^field) in ^value)
    # defp filter({field, value}, query), do: where(query, [o], field(o, ^field) == ^value)
    # defp filters(query, filters), do: Enum.reduce(filters, query, &filter/2)

    def standard(q, false), do: q
    def standard(q, true) do
        from c in q,
        where: [standard: true]
    end

    def card_set(q, nil), do: q
    def card_set(q, set) do
        from c in q,
        where: [cardSet: ^set]
    end

    def mana(q, nil), do: q
    def mana(q, mana) do
        from c in q,
        where: [cost: ^mana]
    end

    def player_class(q, nil), do: q
    def player_class(q, class) do
        from c in q,
        where: [playerClass: ^class]
    end

    def search_query(q, nil), do: q
    def search_query(q, %{"search" => "undefined"}), do: q
    def search_query(query, t) do
    from c in query,
        where: ilike(c.name, ^"%#{t}%"),
        or_where: ilike(c.text, ^"%#{t}%"),
        or_where: ilike(c.rarity, ^"%#{t}%")
    end
end