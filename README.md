# Dtweet

### Un Twitter Descentralizado con Cedalio con el objetivo fomentar la Innovación y Colaboración en la Web3

------------


Este proyecto presenta un sistema de microblogging descentralizado que utiliza la tecnología de Cedalio para almacenar y gestionar datos en un entorno seguro y descentralizado. Nuestro enfoque busca impactar positivamente en el ecosistema Web3, fomentando la colaboración y la innovación.


## Índice

1) [Introduccion](#introduccion)
2) [Tecnologias usadas](#tecnologias-usadas)
3) [Caracteristicas claves](#caracteristicas-claves)
4) [Instalacion](#instalacion)
5) [Licencia](#licencia)

## Introduccion

El objetivo de este proyecto es desarrollar una plataforma de microblogging, un Twitter descentralizado que ofrezca a los usuarios control sobre sus datos y garantice la seguridad y la privacidad. Al utilizar Cedalio, nos aseguramos de que los datos estén almacenados de manera descentralizada y segura, mientras que la plataforma se integra fácilmente con otras soluciones Web3.

## Tecnologias usadas

- Cedalio: Plataforma de almacenamiento descentralizado basada en L1 y L2 networks que utiliza GraphQL para la comunicación entre front-end y back-end.
- ethers: Biblioteca de JavaScript para interactuar con contratos inteligentes y nodos Ethereum.
- Svelte: Framework frontend.
- Hardhat

## Caracteristicas claves

* Almacenamiento descentralizado de tweets y metadatos.
* Control de la privacidad y propiedad de los datos por parte del usuario.
* Compatibilidad con soluciones off-chain para datos sensibles.

## Instalacion (debe hacerse en orden)

0) Si es la primera vez copia el `.env`, las configuracion por defecto es para trabajar desde localhost
```sh
cp .env.example .env
```

1) Instalar dependencias
```sh
yarn
```

2) Correr nodo de hardhat
```sh
npm run hnode
```

3) Deploy de contractos:
```sh
npm run deploy-contracts
```
Deberia deployear un contrato en la address `0x5FbDB2315678afecb367f032d93F642f64180aa3`


4) Deployear graph de cedalio y prender el engine de cedalio
```sh
npm run cedalio
```

5) Prender Sveltekit
```sh
npm run dev
```

6) Fondea en tu cuenta un poco de ether usando las wallets de hardhat por defecto para poder realizar transacciones;
```sh
cast send 0x0000003FA6D1d52849db6E9EeC9d117FefA2e200 --value 1ether --private-key=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --rpc-url http://127.0.0.1:8545
```

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.

