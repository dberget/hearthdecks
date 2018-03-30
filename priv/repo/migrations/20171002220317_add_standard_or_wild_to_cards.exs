defmodule Hearthdecks.Repo.Migrations.AddStandardOrWildToCards do
  use Ecto.Migration

  def change do
    alter table(:cards) do
      add :standard, :boolean, default: false
    end
  end
end
