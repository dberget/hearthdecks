defmodule Hearthdecks.Data.CardUpload do

    @auth ["X-Mashape-Key": "xp7ORs0Tt6mshTK9TCYiWMt2rPNpp1XwlRIjsnSZ1fU5oDJ2FJ"]
    @expansions [:Basic, :"Blackrock Mountain", :Classic, :Credits, :Debug,
    :"Goblins vs Gnomes", :"Hall of Fame", :"Hero Skins", :"Journey to Un'Goro",
    :"Knights of the Frozen Throne", :"Mean Streets of Gadgetzan", :Missions,
    :Naxxramas, :"One Night in Karazhan", :Promo, :System, :"Tavern Brawl",
    :"The Grand Tournament", :"The League of Explorers",
    :"Whispers of the Old Gods"]

    def start do
      request = HTTPoison.get!("https://omgvamp-hearthstone-v1.p.mashape.com/cards", @auth)  
      body = Poison.decode!(request.body, keys: :atoms)
    end
end