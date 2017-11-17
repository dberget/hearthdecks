build-release:
	echo "Make sure you bumped the version in mix.exs"
	$(eval VERSION := $(shell sed -n '/version:/s/ *version: "\(.*\)",/\1/p' mix.exs))
	sleep 3
	mix deps.get
	cd assets && ./node_modules/brunch/bin/brunch b -p
	MIX_ENV=prod mix phx.digest
	docker run -it -v `pwd`:/src --rm --workdir /src -e MIX_ENV=prod erlang-builder mix do deps.clean comeonin, deps.get, compile, release --env=prod

release:
	$(eval VERSION := $(shell sed -n '/version:/s/ *version: "\(.*\)",/\1/p' mix.exs))
	ssh root@45.55.254.134 "mkdir /hearthdecks_new"
	scp _build/prod/rel/hearthdecks/releases/$(VERSION)/hearthdecks.tar.gz root@45.55.254.134:/hearthdecks_new/
	ssh root@45.55.254.134 "cd /var/www/hearthdecks && ./bin/hearthdecks stop"
	ssh root@45.55.254.134 "mv /var/www/hearthdecks /hearthdecks_old"
	ssh root@45.55.254.134 "mv /hearthdecks_new /var/www/hearthdecks"
	ssh root@45.55.254.134 "cd /var/www/hearthdecks && tar xzf hearthdecks.tar.gz"
	ssh root@45.55.254.134 "cd /var/www/hearthdecks && PORT=4000 ./bin/hearthdecks start"
	ssh root@45.55.254.134 "rm -rf /hearthdecks_old"

upgrade:
	echo "Make sure you bumped the version in mix.exs"
	$(eval VERSION := $(shell sed -n '/version:/s/ *version: "\(.*\)",/\1/p' mix.exs))
	sleep 3
	mix deps.get
	cd assets && ./node_modules/brunch/bin/brunch b -p
	MIX_ENV=prod mix phx.digest
	docker run -it -v `pwd`:/src --rm --workdir /src -e MIX_ENV=prod erlang-builder mix do deps.clean comeonin, deps.get, compile, release --env=prod --upgrade
	echo "Do this: "
	echo "ssh in and mkdir /people_tracker/releases/$(VERSION)"
	echo "scp _build/prod/rel/people_tracker/releases/$(VERSION)/people_tracker.tar.gz root@138.197.223.171:/people_tracker/releases/$(VERSION)/"
	echo "ssh in and cd /people_tracker and ./bin/people_tracker upgrade $(VERSION)"

builder:
	cd docker && docker build -t erlang-builder .
