# Aula03 - ORM Prisma

## Demonstração
Projeto modelo com prisma SNOOPY Petshop

### Step by step
-Iniciar um projeto
- 1 Ter um documento DER ou DC
- 2 Criar um repositorio
- 3 Clonar o repositorio e abrir com VScode
- 4 Criar a pasta API e o arquivo server
- 5 Abrir um terminal CTRL + ' e dar os comandos a seguir para iniciar o projeto
```bash
cd api
npm init -y
npm i express cors dotenv
```
- Iniciar o uso do Prisma instalaremos ele globalmente
```bash
npm i prisma -g
```
- Conectar o prisma ao um SGBD MySQL
```bash
npx prisma init --datasource