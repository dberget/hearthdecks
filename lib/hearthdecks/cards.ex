defmodule Hearthdecks.Cards do
    alias Hearthdecks.{Repo, Data.Card}
    import Ecto.Query

    @defaults %{filters: %{}, sort_by: :cost, page: 1}

    def all(opts \\ %{}) do
        opts = Map.merge(@defaults, opts)
    
        Card
        |> order_by(^opts.sort_by)
        |> filters(opts.filters)
        |> Repo.paginate(page: opts.page, page_size: 8)
      end

      defp filter({field, value}, query) when is_list(value), do: where(query, [o], field(o, ^field) in ^value)
      defp filter({field, value}, query), do: where(query, [o], field(o, ^field) == ^value)
    
      defp filters(query, filters), do: Enum.reduce(filters, query, &filter/2)
end