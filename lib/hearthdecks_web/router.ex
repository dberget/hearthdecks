defmodule HearthdecksWeb.Router do
  use HearthdecksWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/", HearthdecksWeb do
    pipe_through :browser 

    get "/", PageController, :index
  end

  scope "/", HearthdecksWeb do
    pipe_through :api

    get "/deck", DeckController, :index
  end

end
