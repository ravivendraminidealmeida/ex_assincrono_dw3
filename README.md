# Como rodar o projeto?
Para rodar o projeto é necessário atualizar as variáveis de ambiente. Use o arquivo `.env.example` como ponto de partida.
```sh
    $ cp .env.example .env
```

Depois já será possível subir os containers com docker-compose. Use a flag `--build `para evitar problemas de cache com as imagens.
```sh
    $ docker compose up --build
```