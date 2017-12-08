defmodule Hearthdecks.Tasks.CardUpload do

  alias Hearthdecks.Data.Card
  import Ecto.Query

    @standard Application.get_env(:hearthdecks, :standard)

    @expansions Application.get_env(:hearthdecks, :wild) 

    @heroes ["HERO_01", "HERO_02", "HERO_03", "HERO_04", "HERO_05", "HERO_06", "HERO_07", "HERO_08", "HERO_09"] 

    @key Application.get_env(:hearthdecks, :key)

    def run do
      Enum.each(@expansions, &(add_set/1))
      Enum.each(@standard, &(add_standard_to_set/1))
      Enum.each(@heroes, &(remove_heroes/1))
    end

    defp add_set(set) do
      IO.puts("adding cards from #{set}")
      exp = URI.encode(set)
      request = HTTPoison.get!("https://omgvamp-hearthstone-v1.p.mashape.com/cards/sets/#{exp}?collectible=1", ["X-Mashape-Key": @key])  
      body = Poison.decode!(request.body, keys: :atoms)
      Enum.each(body, fn(x) -> Hearthdecks.Data.create_card(x) end)
    end

    defp add_standard_to_set(set) do
      IO.puts("adding standard to #{set}")
      q = from c in Card, where: c.cardSet == ^set 
      set_cards = Hearthdecks.Repo.all(q)
      set_ids = Enum.map(set_cards, &(&1.id))
      Enum.each(set_ids, fn(x) -> Hearthdecks.Data.update_card(%Card{id: x}, %{standard: true}) end)
    end

    defp remove_heroes(id) do
      IO.puts("deleting #{id}")
      card = Hearthdecks.Repo.get_by!(Hearthdecks.Data.Card, cardId: id)

      Hearthdecks.Data.delete_card(card)
    end
  end