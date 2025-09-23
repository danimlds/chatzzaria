
# Engenharia de Prompts Aplicada

Este material contém explicações, exemplos e exercícios passo a passo para praticar **Prompt Engineering** com IA, usando técnicas como Zero-shot, Few-shot, Role prompting e Cadeia de Raciocínio.

---

## 1. O que é Engenharia de Prompts?

A Engenharia de Prompts é a prática de criar instruções claras e estratégicas para que uma IA generativa produza respostas mais relevantes, corretas e úteis.

**Analogia:**  
Pedir para a IA sem prompt bem feito é como pedir “faça um bolo” sem dar receita; ela vai inventar.  
Com um prompt bem estruturado, você fornece ingredientes e passos, garantindo o resultado desejado.

---

## 2. Técnicas Principais

### Zero-shot
- Sem exemplos, apenas instrução direta.
- Exemplo:
```
Explique o conceito de recursão em programação.
```

### Few-shot
- Fornece 1–3 exemplos de input → output antes de pedir uma nova tarefa.
- Exemplo:
```
Transforme frases em linguagem simples:
- Original: "O paradigma da orientação a objetos baseia-se em abstrações."
- Simples: "A orientação a objetos usa abstrações para organizar o código."

Agora faça:
- Original: "A arquitetura em camadas separa responsabilidades do software."
```

### Role prompting
- Atribui um papel ou persona à IA.
- Exemplo:
```
Você é um revisor de código sênior. Analise o seguinte código e sugira melhorias:
[código aqui]
```

### Cadeia de raciocínio (Chain of Thought)
- Pede para a IA explicar passo a passo antes de dar a resposta final.
- Exemplo:
```
Resolva o problema: um algoritmo ordena uma lista de 10 mil números.
Explique passo a passo qual estrutura de dados é mais eficiente e depois dê a resposta final.
```

---

## 3. Aplicações Práticas

- Refatorar código
- Gerar documentação de software
- Simular entrevistas técnicas
- Criar user stories e casos de teste

---

## 4. Exercícios Passo a Passo

### Exercício 1 – Zero-shot: Explicando uma estrutura de dados
**Objetivo:** Criar um prompt direto para explicar um conceito técnico.
1. Abra o ChatGPT ou sua API.
2. Escolha uma estrutura de dados (ex.: lista, fila, árvore binária).
3. Digite um prompt direto:
```
Explique o que é uma árvore binária e como ela funciona, de forma simples.
```
4. Analise a resposta. Refine se necessário:
```
Explique novamente usando uma analogia com objetos do dia a dia.
```

### Exercício 2 – Few-shot: Convertendo linguagem técnica em simples
**Objetivo:** Transformar frases complexas em linguagem fácil.
1. Forneça 1–2 exemplos de input → output:
```
Exemplo 1:
Original: "O paradigma orientado a objetos baseia-se em abstrações."
Simples: "A orientação a objetos organiza o código usando abstrações."

Exemplo 2:
Original: "A arquitetura em camadas separa responsabilidades."
Simples: "O software é dividido em camadas para organizar funções."
```
2. Peça à IA para transformar uma frase nova:
```
Original: "O sistema deve suportar múltiplos usuários simultâneos."
```
3. Compare e discuta a clareza.

### Exercício 3 – Role prompting: Professor de algoritmos
**Objetivo:** Fazer a IA assumir um papel específico.
1. Defina o papel:
```
Você é um professor de algoritmos. Explique passo a passo como funciona o algoritmo de busca binária.
```
2. Analise a resposta.
3. Experimente pedir exercícios de fixação:
```
Crie 2 exercícios para os alunos praticarem busca binária.
```

### Exercício 4 – Cadeia de raciocínio: Resolver problema matemático
**Objetivo:** IA deve explicar passo a passo antes de responder.
1. Escolha um problema simples (ex.: fatorial de 5).
2. Prompt:
```
Resolva o problema passo a passo e explique cada etapa:
"Calcule 5! (fatorial de 5)"
```
3. Analise se a IA lista todos os passos e dá a resposta correta.
4. Experimente problemas mais complexos, pedindo explicação antes do resultado.

### Exercício 5 – Refatorar código
**Objetivo:** Melhorar legibilidade e estilo.
1. Cole um código curto:
```js
function soma(a,b){return a+b;}
```
2. Prompt:
```
Você é um engenheiro de software. Refatore o código acima para torná-lo mais legível e organizado. Explique mudanças.
```
3. Compare versão refatorada com a original.
4. Discuta riscos e melhorias adicionais.

### Exercício 6 – Gerar documentação
**Objetivo:** Criar docstrings e README.
1. Cole funções curtas.
2. Prompt:
```
Gere docstrings para cada função e um README resumido explicando o uso das funções.
```
3. Analise a documentação.
4. Experimente mudar formato de saída (Markdown, JSON, lista).

### Exercício 7 – Simular entrevista técnica
**Objetivo:** Criar perguntas técnicas e respostas simuladas.
1. Defina tema (ex.: Node.js, Python, SQL).
2. Prompt:
```
Você é um entrevistador sênior. Crie 5 perguntas de nível júnior sobre [tema].
Para cada pergunta, forneça a resposta esperada e pontos de avaliação.
```
3. Opcional: simule um candidato e peça feedback e nota.

### Exercício 8 – Gerar User Stories e Casos de Teste
**Objetivo:** Criar histórias de usuário + testes em Gherkin.
1. Escolha um produto (ex.: app de contatos).
2. Prompt:
```
Você é Product Owner. Gere 5 user stories para um app de contatos.
Para cada story, inclua critérios de aceitação e testes em Gherkin.
```
3. Analise se estão claras, completas e testáveis.

---

## 5. Dicas Finais
- Seja específico no pedido.
- Peça formatos claros (JSON, Markdown, lista).
- Refine o prompt até ficar bom.
- Use exemplos para ensinar o estilo desejado.
