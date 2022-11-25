# CSV2JSON
# Sumário

> Nesse desafio, você deve conseguir construir um algorítimo que possa pegar arquivos .csv dentro de uma pasta e convertê-los em arquivos .json em uma pasta de saída. Você pode utilizar a linguagem Javascript para resolver. Caso queira fazer um front-end para a aplicação, será um diferencial. Você deve documentar toda a jornada de aprendizado do desafio.
> 

## Case para o desafio

- Deve ser possível colocar quantos arquivos .csv forem necessários dentro da pasta de entrada;
- Na pasta de saída, é necessário que todos os arquivos da pasta de entrada sejam convertidos para .json.

<aside>
💡 Use esse o arquivo de exemplo para desenvolver a aplicação

</aside>

[exemplo.csv](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4caba8aa-0d0f-4bef-9a64-5053fd749c06/exemplo.csv)

## 🎁 Exemplo

Lembre-se que o conversor deve conseguir converter qualquer tipo de arquivo e não somente o de exemplo.

```jsx
// CSV - Input
name,age
João,18
Guilherme,20

// JSON - Output
[
	{
		name: "João",
		age: 18
	},
	{
		name: "Guilherme",
		age: 20
	}
]
```

## 💡Diferenciais

- Fazer testes unitários;
- Utilizar POO;
- Utilizar Typescript.

## ❌Restrições

- Utilizar Libs;
- Não copiar código.

## 🚀 Tecnologias ##
 <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> 

## Como usar❓ ##

Antes de iniciar, você precisa ter [Git](https://git-scm.com) e [Node](https://nodejs.org/en/) instalados.

```bash
# 1. Clone this project
$ git clone https://github.com/RafaRamosCosta/CSV2JSON.git

# 2.Access
$ cd CSV2JSON

# 3.Install dependencies
$ yarn or npm

# 4.Put the csv files in the data directory

# 5.Run the project
$ yarn tsc or npx tsc
$ yarn convert or npm run convert

# 6.Run tests
$ yarn test or npm test
```
