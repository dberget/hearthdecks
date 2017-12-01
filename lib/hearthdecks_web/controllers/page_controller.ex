defmodule HearthdecksWeb.PageController do
  use HearthdecksWeb, :controller

  def index(conn, _params) do  
      render(conn, "index.html")
    end 

end