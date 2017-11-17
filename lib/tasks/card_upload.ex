defmodule Hearthdecks.Tasks.CardUpload do

  alias Hearthdecks.Data.Card
  import Ecto.Query

    @standard ["Basic", "Kobolds & Catacombs", "Classic", "Journey to Un'Goro","Knights of the Frozen Throne", "Mean Streets of Gadgetzan", "One Night in Karazhan", "Whispers of the Old Gods"]

    @expansions ["Basic", "Blackrock Mountain", "Classic",
    "Goblins vs Gnomes", "Hall of Fame", "Journey to Un'Goro",
    "Knights of the Frozen Throne", "Mean Streets of Gadgetzan",
    "Naxxramas", "One Night in Karazhan",
    "The Grand Tournament", "The League of Explorers",
    "Whispers of the Old Gods"]

    def run do
      Enum.each(@expansions, &(add_set/1))
      Enum.each(@standard, &(add_standard_to_set/1))
    end

    defp add_set(set) do
      IO.puts("adding cards from #{set}")
      exp = URI.encode(set)
      request = HTTPoison.get!("https://omgvamp-hearthstone-v1.p.mashape.com/cards/sets/#{exp}?collectible=1", ["X-Mashape-Key": "xp7ORs0Tt6mshTK9TCYiWMt2rPNpp1XwlRIjsnSZ1fU5oDJ2FJ"])  
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
  end