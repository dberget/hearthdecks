# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :hearthdecks,
  ecto_repos: [Hearthdecks.Repo],
  classes: ["Neutral","Druid","Hunter","Mage", "Paladin", "Priest","Rogue","Shaman", "Warlock", "Warrior"]

# Configures the endpoint
config :hearthdecks, HearthdecksWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "h1w3IA8PiVyrFRorQGv3i8RRC52AO3anWnxz0/aiwftQn5m73tzv+OHolQanCF26",
  render_errors: [view: HearthdecksWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Hearthdecks.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
