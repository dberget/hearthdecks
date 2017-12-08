defmodule HearthdecksWeb.Router do
  use HearthdecksWeb, :router

  @classes Application.get_env(:hearthdecks, :classes)

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
    get "/deck/:deckstring", PageController, :index
    Enum.each(@classes, &((get "/#{&1}", PageController, :index))) ## Creates a route for each class 
  end

  scope "/", HearthdecksWeb do
    pipe_through :api

    get "/new/cards", CardController, :index
    get "/upload/cards", CardController, :dbfid
  end

end
