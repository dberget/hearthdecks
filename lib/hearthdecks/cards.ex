defmodule Hearthdecks.Cards do
    alias Hearthdecks.{Repo, Data.Card}
    import Ecto.Query

    @defaults %{filters: %{}, search: nil, sort_by: :cost, page: 1}

    def all(opts \\ %{}) do
        opts = Map.merge(@defaults, opts)
    
        Card
        |> order_by(^opts.sort_by)
        |> filters(opts.filters)
        |> search_query(opts.search)
        |> Repo.paginate(page: opts.page, page_size: 8)
      end

      defp filter({field, value}, query) when is_list(value), do: where(query, [o], field(o, ^field) in ^value)
      defp filter({field, value}, query), do: where(query, [o], field(o, ^field) == ^value)
    
      defp filters(query, filters), do: Enum.reduce(filters, query, &filter/2)


       def search_query(q, nil), do: q
       def search_query(q, %{"search" => "undefind"}), do: q
       def search_query(query, t) do
        from c in query,
            or_where: ilike(c.name, ^"%#{t}%"),
            or_where: ilike(c.faction, ^"%#{t}%"),
            or_where: ilike(c.text, ^"%#{t}%"),
            or_where: ilike(c.rarity, ^"%#{t}%"),
            or_where: ilike(c.cardSet, ^"%#{t}%")
      end
end