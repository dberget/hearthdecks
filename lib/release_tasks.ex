defmodule Release.Tasks do 
    alias Hearthdecks.Tasks.CardUpload

    def migrate do
        {:ok, _path} = Application.ensure_all_started(:hearthdecks)

        path = Application.app_dir(:hearthdecks, "priv/repo/migrations")

        Ecto.Migrator.run(Hearthdecks.Repo, path, :up, all: true)

        CardUpload.run
    end
end
