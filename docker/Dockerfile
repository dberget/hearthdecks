# Builds an image with erlang and elixir installed
# that matches our production system so the right
# libraries are in place when building releases
FROM ubuntu:16.04

ENV CACHE_BUST 20171114_1052

RUN apt-get update && apt-get install -y apt-transport-https
RUN apt-get install locales && locale-gen en_US.UTF-8
RUN apt-get install -y build-essential git-all wget

RUN wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb 
RUN dpkg -i erlang-solutions_1.0_all.deb
RUN apt-get update && apt-get install -y erlang elixir
 

ENV LANG en_US.UTF-8  
ENV LC_ALL en_US.UTF-8  
ENV LANGUAGE en_US:en 

RUN mix local.hex --force
RUN mix local.rebar --force