# Puzzle Word Solver

## Descrição

Este projeto foi desenvolvido para resolver um problema proposto pela BWTECH, onde peças de um quebra-cabeça contendo letras maiúsculas devem ser organizadas de forma que revelem uma palavra ou frase. Cada peça possui um número na parte esquerda e outro na parte direita, e uma peça se encaixa depois da outra na sequência quando seu número esquerdo for igual ao número direito da peça anterior. O número esquerdo da primeira peça é sempre 0 e o número direito da última peça é sempre 1.

## Solução

A solução foi implementada usando os princípios da programação orientada a objetos (POO) em JavaScript. A classe `PuzzlePiece` representa uma peça individual do quebra-cabeça, e a classe `Puzzle` gerencia a coleção de peças e monta a palavra ou frase resultante. O código JavaScript está compilado dentro de uma pasta chamada `output`.

### Funcionalidades

- **Validação de Dados:**

  - Verifica se cada peça contém exatamente uma letra maiúscula.
  - Assegura que o número 0 está presente na parte esquerda de uma peça.
  - Assegura que o número 1 está presente na parte direita de uma peça.
  - Verifica se há números repetidos na parte esquerda ou direita das peças.
  - Verifica se os números da direita e da esquerda se encaixam corretamente para formar a sequência.

- **Montagem da Palavra:**
  - Organiza as peças na ordem correta para formar a palavra ou frase.

## Uso

### Inicialização das Peças

A entrada de dados pode ser feita através do construtor da classe `Puzzle` ou do método `setPieces`. A entrada deve ser em formato de matriz, onde cada submatriz contém um número à esquerda, uma letra, e um número à direita.

Exemplo de entrada:

const pieces = [
[0, 'A', 3],
[3, 'T', 4],
[4, 'A', 1]
];

### Criação do Quebra-Cabeça

As peças são passadas para a classe Puzzle, que irá validar as peças e montar a palavra.

##### Exemplo de uso com o construtor:

const puzzle = new Puzzle(pieces);
const word = puzzle.getWord();
console.log(word); // Saída: "ATA"

##### Exemplo de uso com o método setPieces:

const puzzle = new Puzzle();
puzzle.setPieces(pieces);
const word = puzzle.getWord();
console.log(word); // Saída: "ATA"

### Como Executar

##### Instalação:

Certifique-se de ter o Node.js instalado em sua máquina.
Clone o repositório e navegue até o diretório do projeto.

Execução:

npm start
