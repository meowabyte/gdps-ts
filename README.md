<img alt="Logo" src="assets/logo.webp" height="128" />

# 🟦 gdps-ts

> [!CAUTION]
> This project is **HEAVILY WORK IN PROGRESS** and should not currently be used in actual GDPS projects. **THIS PROJECT DOESN'T HAVE MOST OF ENDPOINTS IMPLEMENTED!!!!**

My attempt at implementing fully working Geometry Dash private server using [Bun](https://bun.sh/) + [TypeScript](https://www.typescriptlang.org/)

## Hardcoded Values Notice

Currently a lot of simple connection stuff are hardcoded for development purposes but that'll be changed in the future.  
Some of them are:

-   Port - `1337` for GDPS endpoints
-   Pathname - `/gds/<route>`
    -   I'm using `/gds` here to fit the byte count to prevent bytes offsetting when patching the .exe file, but that's less important.
-   Database port - Due to how the project is set up and knowing Docker by default doesn't expose database connection, port is not being changed from it's default - `3306`.

## Setting Up

> [!NOTE]
> This guide will be targetted towards Linux users (specifically Arch Linux), if you have other OS please follow guide specific for your system. I don't guarantee you'll get it working on there!

First you need [**git**](https://git-scm.com/downloads) to clone the project. (you can also download it manually through `Code > Download ZIP`) and use this command:

```sh
$ git clone https://github.com/meowabyte/gdps-ts.git
```

**It is HIGHLY RECOMMENDED changing `MARIADB_PASSWORD` and `MARIADB_ROOT_PASSWORD` lines in [db.env](/db.env) to your own passwords! As default passwords are publically available.**

Once you have first step done you can pick the way you'll run the server. I personally recommend Docker way as it sets up most of the stuff for you in container.

### 📦️ Docker

#### Requirements:

-   [Docker](https://www.docker.com/get-started/) + [Docker Compose](https://docs.docker.com/compose/install/)  
    _On Arch Linux can be installed with `pacman -S docker docker-compose`_

#### Running:

```sh
$ cd gdps-ts
$ docker compose up
```

This will set up everything in the special container for you.
When using Docker, database is not exposed publically for security purposes. Though if you need this for testing purposes, add this line in [compose.yaml](/compose.yaml) near `gdps` service and restart the server:

```yaml
ports:
    - "<public port>:3306"
```

### ⚙️ Manual Installation

#### Requirements:

-   [Bun](https://bun.sh/) (v1.2.17+ recommended)
-   **Active [MariaDB](https://mariadb.org/) database ready for connection**  
    Due to this project using [ORM](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping) database package - [Sequelize](https://sequelize.org/) - there is a lot of supported databases. MariaDB is recommended though as project was made with it in mind.  
    Please refer to [Sequelize guide](https://sequelize.org/docs/v6/getting-started/#installing) if you want to use database other than MariaDB.

#### Installation:

```sh
$ cd gdps-ts
$ bun install --frozen-lockfile
```

Please also take a note that [db.env](/db.env) was set up with Docker in mind so you should change those values to your needs!

#### Running:

```sh
$ bun start # Will run the app normally (RECOMMENDED)
$ bun dev # Will run the app with all test and logging features intended for developing use (NOT RECOMMENDED ON PRODUCTION)
```

## [Configuration](/CONFIG.md)

## [Endpoints Implementation State](/ENDPOINTS.md)

## Credits

I really need to thank all of these awesome sources for helping me in this project. I wouldn't go far without them.

-   [GDDocs](https://wyliemaster.github.io/gddocs/#/)
-   [GD Programming Discord Server](https://discord.gg/gd-programming-646101505417674758)
-   [Cvolton's GDPS implementation](https://github.com/Cvolton/GMDprivateServer)
