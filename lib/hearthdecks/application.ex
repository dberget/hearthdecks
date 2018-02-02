defmodule Hearthdecks.Application do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    children = [
      supervisor(Hearthdecks.Repo, []),
      supervisor(HearthdecksWeb.Endpoint, [])
    ]

    opts = [strategy: :one_for_one, name: Hearthdecks.Supervisor]
    Supervisor.start_link(children, opts)
  end

  def config_change(changed, _new, removed) do
    HearthdecksWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
