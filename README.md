**RF** => Requisitos Funcionais

**RNF** => Requisitos Não Funcionais

**RN** => Requisitos de Negócio


# Cadastro de Carro

**RF**
Deve ser possível cadastrar um carro.

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado por padrão com disponibilidade.
O usuário responsável pelo cadastro deve ser um usuário administrador.


# Listagem de Carros

**RF**
Deve ser possivel listar todos os carros disponíveis.
Deve ser possivel listar todos os carros disponíveis pelo nome da categoria.
Deve ser possivel listar todos os carros disponíveis pelo nome da marca.
Deve ser possivel listar todos os carros disponíveis pelo nome do carro.

**RN**
O usuário não precisa estar logado no sistema.


# Cadastro de Especificação no Carro

**RF**
Deve ser possivel cadastrar uma especificação para um carro.

**RN**
Não deve ser possivel cadastrar uma especificação para um carro não cadastrado.
Não deve ser possivel cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.


# Cadastro de Imagens do Carros

**RF**
Deve ser possível cadastrar uma imagem do carro.

**RNF**
Utilizar o multer para upload dos arquivos

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de Carro

**RF**
Deve ser possível cadastrar um aluguel.

**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.