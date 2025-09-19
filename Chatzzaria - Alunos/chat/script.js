// ------------------- CONFIGURAÇÕES DA API -------------------

// URL base do seu recurso Azure OpenAI
const endpoint = 
// Chave de acesso da API (para autenticar a requisição)
const apiKey =
  
// Nome do modelo implantado (deployment) no Azure
const deployment =

// Versão da API que está sendo usada
const apiVersion =

// ------------------- ELEMENTOS DA PÁGINA -------------------

// Pega a seção do chat onde as mensagens vão aparecer
const secaoConversa = document.getElementById("div_conversa");

// Pega o campo de texto (textarea) onde o usuário digita a pergunta
const pergunta = document.getElementById("pergunta");

// ------------------- FUNÇÃO PRINCIPAL -------------------

function callAzureOpenAI(pergunta2) {
  // Monta a URL da requisição juntando o endpoint, deployment e versão
  const url = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

  // Configuração da requisição (o que será enviado para a API)
  const config = {
    messages: [
      {
        // "system" define o comportamento do modelo (instruções iniciais)
        role: "system",
        content: `Você é um especialista em pizzas e só pode responder sobre esse assunto. 
Se a pergunta não for relacionada a pizzas, responda: 
"Desculpe, só posso responder sobre as pizzas disponíveis." 
Informe sempre que existem três tipos de massa (Tradicional, Fina e Integral) 
e três tamanhos (Média - 6 fatias, Grande - 8 fatias, Família - 12 fatias). 
Seja sempre amigável e objetivo em suas recomendações.`,
      },
      {
        // "user" é a mensagem enviada pelo usuário
        role: "user",
        content: pergunta2,
      },
    ],
    max_tokens: 800, // Define o tamanho máximo da resposta em "tokens".
    // Um token pode ser uma palavra inteira ou parte de uma palavra.
    // Exemplo: "pizza" pode ser 1 token, "pizzaria" pode virar 2 tokens.
    // Se colocar 800, significa que a resposta pode ser bem longa.
    // Se diminuir (ex: 100), a resposta será mais curta e objetiva.

    temperature: 0, // Controla a criatividade da IA.
    // Vai de 0 a 2.
    // 0 = respostas sempre mais "fixas", quase sem variação.
    // 1 = respostas criativas e variadas.
    // 2 = respostas muito diferentes e imprevisíveis.
    // Aqui foi deixado em 0 para a IA não inventar nada fora do tema.

    top_p: 0.95, // Controla a "probabilidade cumulativa" das palavras escolhidas.
    // Funciona como um filtro de diversidade.
    // Se estiver em 1.0 = IA pode escolher qualquer palavra, mesmo improvável.
    // Se estiver em 0.5 = IA só escolhe entre palavras mais prováveis.
    // 0.95 é um equilíbrio (varia, mas ainda faz sentido).

    frequency_penalty: 0, // Penaliza repetições de palavras/frases.
    // Vai de -2 a 2.
    // Se aumentar (ex: 1), a IA evita repetir muitas vezes a mesma palavra.
    // Se diminuir (ex: -1), ela pode repetir mais.
    // Como está 0, não interfere (resposta natural).

    presence_penalty: 0, // Incentiva ou não trazer novos assuntos.
    // Vai de -2 a 2.
    // Se aumentar (ex: 1), a IA tenta puxar assuntos diferentes (mais variada).
    // Se deixar 0, ela só responde o que foi perguntado sem "forçar" novos temas.
    // Aqui é importante porque queremos que a IA fale APENAS de pizza.
  };

  // ------------------- CHAMADA À API -------------------
  try {
    // Faz a requisição HTTP usando fetch
    fetch(url, {
      method: "POST", // Tipo da requisição: POST significa que estamos enviando dados para o servidor
      headers: {
        "Content-Type": "application/json", // Diz que os dados enviados estão em formato JSON
        "api-key": apiKey, // Chave de acesso da API do Azure (autenticação)
      },
      body: JSON.stringify(config), // Converte o objeto "config" em JSON para enviar na requisição
    })
      // Quando a resposta do servidor chega, converte o conteúdo para JSON
      .then((response) => response.json())
      // Quando o JSON estiver pronto, pega o conteúdo da resposta da IA
      .then((result) => {
        // Chama a função que adiciona a mensagem no chat
        addMessageToChat(
          "div_card_conversa_chat", // Indica que é mensagem do bot
          result.choices[0].message.content // Pega o texto da primeira resposta do modelo
        );

        // Mostra a resposta da IA também no console (para debug ou estudo)
        console.log(result.choices[0].message.content);
      })
      // Se houver algum erro durante a execução do fetch (ex: problema de rede)
      .catch((error) => {
        // Mostra a mensagem de erro no chat (para o usuário ver)
        addMessageToChat("div_card_conversa_chat", `Erro: ${error.message}`);
        // Mostra o erro detalhado no console (para o desenvolvedor)
        console.log(error);
      });
  } catch (error) {
    // Captura qualquer erro que aconteça dentro do bloco try (mais geral)
    addMessageToChat("div_card_conversa_chat", error); // Mostra no chat
    console.log(error.message); // Mostra a mensagem de erro no console
    console.log(error); // Mostra o objeto completo do erro
  }
}

// ------------------- FUNÇÃO PARA ADICIONAR MENSAGEM NO CHAT -------------------

function addMessageToChat(className, messageContent) {
  // Verifica se a mensagem é do bot
  if (className === "div_card_conversa_chat") {
    // Mensagem do bot
    secaoConversa.innerHTML += `
      <div class="div_card_conversa" id="${className}">
        <!-- Botão de áudio para ouvir a resposta do bot -->
        <button type="button">
          <img id="img_audio" src="../assets/imagens/audio.svg" alt="Botão de áudio">
        </button>

        <!-- Texto da mensagem do bot -->
        <p>${messageContent}</p>

        <!-- Imagem do robô ao lado da mensagem -->
        <img id="img_bot" src="../assets/imagens/bot.svg" alt="Imagem do robô">
      </div>
    `;
  } else {
    // Caso não seja do bot, considera que é do usuário
    secaoConversa.innerHTML += `
      <div class="div_card_conversa" id="${className}">
        <!-- Texto da mensagem do usuário -->
        <p>${messageContent}</p>
      </div>
    `;
  }

  // Faz o scroll da div de conversa descer automaticamente até a última mensagem
  // Isso garante que a mensagem mais recente sempre fique visível
  secaoConversa.scrollTop = secaoConversa.scrollHeight;
}

// ------------------- EVENTO DO FORMULÁRIO -------------------

// Escuta o evento de envio do formulário (quando o usuário clica em "enviar")
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault(); // Impede que a página recarregue ao enviar

  const userMessage = pergunta.value.trim(); // Pega o texto digitado (sem espaços extras)

  // Adiciona a mensagem do usuário no chat
  addMessageToChat("div_card_conversa_usuario", userMessage);

  // Chama a API para gerar a resposta
  callAzureOpenAI(userMessage);

  // Limpa o campo de texto depois de enviar
  pergunta.value = "";
});
