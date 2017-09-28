defmodule HearthdecksWeb.DeckControllerTest do
  use HearthdecksWeb.ConnCase

  alias Hearthdecks.Data

  @create_attrs %{}
  @update_attrs %{}
  @invalid_attrs %{}

  def fixture(:deck) do
    {:ok, deck} = Data.create_deck(@create_attrs)
    deck
  end

  describe "index" do
    test "lists all decks", %{conn: conn} do
      conn = get conn, deck_path(conn, :index)
      assert html_response(conn, 200) =~ "Listing Decks"
    end
  end

  describe "new deck" do
    test "renders form", %{conn: conn} do
      conn = get conn, deck_path(conn, :new)
      assert html_response(conn, 200) =~ "New Deck"
    end
  end

  describe "create deck" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post conn, deck_path(conn, :create), deck: @create_attrs

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == deck_path(conn, :show, id)

      conn = get conn, deck_path(conn, :show, id)
      assert html_response(conn, 200) =~ "Show Deck"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, deck_path(conn, :create), deck: @invalid_attrs
      assert html_response(conn, 200) =~ "New Deck"
    end
  end

  describe "edit deck" do
    setup [:create_deck]

    test "renders form for editing chosen deck", %{conn: conn, deck: deck} do
      conn = get conn, deck_path(conn, :edit, deck)
      assert html_response(conn, 200) =~ "Edit Deck"
    end
  end

  describe "update deck" do
    setup [:create_deck]

    test "redirects when data is valid", %{conn: conn, deck: deck} do
      conn = put conn, deck_path(conn, :update, deck), deck: @update_attrs
      assert redirected_to(conn) == deck_path(conn, :show, deck)

      conn = get conn, deck_path(conn, :show, deck)
      assert html_response(conn, 200)
    end

    test "renders errors when data is invalid", %{conn: conn, deck: deck} do
      conn = put conn, deck_path(conn, :update, deck), deck: @invalid_attrs
      assert html_response(conn, 200) =~ "Edit Deck"
    end
  end

  describe "delete deck" do
    setup [:create_deck]

    test "deletes chosen deck", %{conn: conn, deck: deck} do
      conn = delete conn, deck_path(conn, :delete, deck)
      assert redirected_to(conn) == deck_path(conn, :index)
      assert_error_sent 404, fn ->
        get conn, deck_path(conn, :show, deck)
      end
    end
  end

  defp create_deck(_) do
    deck = fixture(:deck)
    {:ok, deck: deck}
  end
end
