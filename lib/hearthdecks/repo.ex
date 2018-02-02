defmodule Hearthdecks.Repo do
  use Ecto.Repo, otp_app: :hearthdecks
  use Scrivener, page_size: 8

  def init(_, opts) do
    {:ok, Keyword.put(opts, :url, System.get_env("DATABASE_URL"))}
  end
end
