# Dtweet

Un Twitter Descentralizado con Cedalio con el objetivo fomentar la Innovación y Colaboración en la Web3

------------


Este proyecto presenta un sistema de microblogging descentralizado que utiliza la tecnología de Cedalio para almacenar y gestionar datos en un entorno seguro y descentralizado. Nuestro enfoque busca impactar positivamente en el ecosistema Web3, fomentando la colaboración y la innovación.


## Índice

1) [Introduccion](#introduccion)
2) [Tecnologias usadas](#tecnologias-usadas)
3) [Caracteristicas claves](#caracteristicas-claves)
4) [Instalacion](#instalacion)
5) [Licencia](#licencia)

### [Introduccion][introduccion]

El objetivo de este proyecto es desarrollar una plataforma de microblogging, un Twitter descentralizado que ofrezca a los usuarios control sobre sus datos y garantice la seguridad y la privacidad. Al utilizar Cedalio, nos aseguramos de que los datos estén almacenados de manera descentralizada y segura, mientras que la plataforma se integra fácilmente con otras soluciones Web3.

### [Tecnologias usadas][tecnologias-usadas]

- Cedalio: Plataforma de almacenamiento descentralizado basada en L1 y L2 networks que utiliza GraphQL para la comunicación entre front-end y back-end.
- ethers: Biblioteca de JavaScript para interactuar con contratos inteligentes y nodos Ethereum.
- Svelte: Framework frontend.
- Hardhat

### [Caracteristicas claves][caracteristicas-claves]

* Almacenamiento descentralizado de tweets y metadatos.
* Control de la privacidad y propiedad de los datos por parte del usuario.
* Compatibilidad con soluciones off-chain para datos sensibles.

### [Instalacion][instalacion]


```sh
  cedalio deploy --fresh --force --schema-name tweeter --network hardhat --schema-file schema.graphql


  cedalio compile

  cedalio deploy

  cedalio serve --schema-name tweeter
```

### [Licencia][licencia]

Este proyecto está licenciado bajo la Licencia MIT.

