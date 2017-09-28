defmodule Hearthdecks.Repo.Migrations.CreateCards do
  use Ecto.Migration

  def change do
    create table(:cards) do
      add :cardId, :string
      add :dbfId, :string
      add :name, :string
      add :cardSet, :string
      add :type, :string
      add :faction, :string
      add :img, :string
      add :imgGold, :string
      add :playerClass, :string
      add :rarity, :string
      add :collectible, :boolean
      add :cost, :integer
      add :text, :string
      add :attack, :integer
      add :health, :integer

      timestamps()
    end
  end
end
