use Mix.Config

config :hearthdecks, HearthdecksWeb.Endpoint,
  load_from_system_env: true,
  http: [port: {:system, "PORT"}],
  url: [host: "hearthdecks.daveberget.com", port: 80],
  cache_static_manifest: "priv/static/cache_manifest.json",
  server: true,
  root: ".",
  version: Mix.Project.config()[:version]

config :logger, level: :info

import_config "prod.secret.exs"
