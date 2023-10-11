# coinrank-noxpay
Aplicação de ranking de popularidade de moedas, criada para resolução de teste técnico para a vaga de FullStack Jr

### Tecnologias utilizadas
- React
- Golang (Echo, Gorm)
- PostgreSQL

## Como rodar a aplicação?
É necessário que você tenha Node.js, PostgreSQL e Golang instalados.
1. Clone esse repositório;
2. Acesse o diretório /frontend e rode o comando `npm install`;
3. Configure a conexão com o PostgreSQL no arquivo database.go e crie um arquivo .env com a variável `DATABASE_URL`, que deve armazenar a string de conexão; também é necessário criar uma tabela "coins" no banco de dados, baseando-se nos campos do Model no arquivo Coin.go;
4. Retorne ao diretório raiz e execute o arquivo dev.bat, com o comando `./dev.bat`, caso esteja usando Windows.
Se você estiver usando Linux ou MacOS, rode o arquivo dev.sh, com o comando `./dev.sh`.
O arquivo vai rodar a aplicação React e o servidor.

## Como funciona?
### Back-End
O back-end possui duas rotas:

#### GET /coins
Retorna um JSON com todas as coins salvas no banco de dados.

![image](https://github.com/brittola/coinrank-noxpay/assets/99913525/8c797536-3304-4429-9f69-198ee5b466fc)


#### PUT /coins
Recebe o ID de uma moeda e o upvote (sendo 1 ou -1) e atualiza no banco de dados.
Retorna um JSON com os dados da moeda atualizados.

![image](https://github.com/brittola/coinrank-noxpay/assets/99913525/a3724126-0dd5-478c-bc22-c1f1bbe10490)

### Front-End
Consome a API e lista as moedas na tela, permitindo o usuário visualizar, buscar por nome e aumentar a popularidade com voto. Como o back-end não contempla cadastros/autenticação, o voto do usuário fica registrado em localStorage.

![image](https://github.com/brittola/coinrank-noxpay/assets/99913525/03c2ee1b-4582-45fd-9493-91f3f30077dd)

## Projeto Online
- API: https://coinrank.onrender.com/
- Interface: https://coinrank-six.vercel.app/
