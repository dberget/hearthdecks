defmodule Hearthdecks.Repo.Migrations.CreateDecks do
  use Ecto.Migration

  def change do
    create table(:decks) do
      add :deckstring, :string

      timestamps()
    end

  end
end
