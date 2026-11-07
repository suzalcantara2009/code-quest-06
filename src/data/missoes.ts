export interface MissaoCompleta {
  id: number;
  modulo_id: number;
  nicho: string;
  tecnologia: string;
  titulo: string;
  enunciado: string;
  codigo_inicial: string;
  criterio_aceite: string;
  dica: string;
  dificuldade: 'facil' | 'medio' | 'dificil';
  xp: number;
}

export const MODULOS_NICHOS = [
  {
    id: 1,
    ordem: 1,
    titulo: 'Módulo 1 — Programação em Blocos',
    nicho: 'Programação em Blocos',
    tecnologia: 'Blocos / Lógica',
    descricao: 'Fundamentos de lógica algorítmica, variáveis, estruturas condicionais e laços de repetição visuais.',
    icone: 'Blocks',
    cor: 'purple',
  },
  {
    id: 2,
    ordem: 2,
    titulo: 'Módulo 2 — Python',
    nicho: 'Python',
    tecnologia: 'Python',
    descricao: 'Sintaxe limpa, estruturas de dados, funções, loops e modelagem orientada a objetos com scripts eficientes.',
    icone: 'Code',
    cor: 'cyan',
  },
  {
    id: 3,
    ordem: 3,
    titulo: 'Módulo 3 — HTML e CSS',
    nicho: 'HTML e CSS',
    tecnologia: 'HTML/CSS',
    descricao: 'Estruturação semântica, acessibilidade web, responsividade, Flexbox, Grid e animações visuais.',
    icone: 'FileCode',
    cor: 'emerald',
  },
  {
    id: 4,
    ordem: 4,
    titulo: 'Módulo 4 — JavaScript',
    nicho: 'JavaScript',
    tecnologia: 'JavaScript',
    descricao: 'Interatividade no navegador, manipulação de eventos e DOM, arrays modernos e consumo de APIs assíncronas.',
    icone: 'Layers',
    cor: 'amber',
  },
];

export const MISSOES_CATALOGO: MissaoCompleta[] = [
  // ==========================================
  // NICHO 1: PROGRAMAÇÃO EM BLOCOS (MÓDULO 1)
  // ==========================================
  {
    id: 1,
    modulo_id: 1,
    nicho: 'Programação em Blocos',
    tecnologia: 'Blocos / Lógica',
    titulo: 'O Despertar do Algoritmo: A Sequência de Passos',
    dificuldade: 'facil',
    xp: 15,
    enunciado:
      'Para abrir o Portão Ancestral da Cidadela dos Magos, o jovem herói precisa acender 3 tochas sagradas rigorosamente na ordem sequencial. Monte a sequência lógica de passos para mover o avatar e acender cada uma das tochas sem pular etapas.',
    codigo_inicial: `// [BLOCO INICIAL - SEQUÊNCIA DE AÇÕES]
MoverFrente(2);
AcenderTocha(1);
MoverFrente(3);
AcenderTocha(2);
// TODO: Adicione o comando para alcançar a terceira tocha e acioná-la:
// MoverFrente(?);
// AcenderTocha(3);
AbrirPortaoAncestral();`,
    criterio_aceite:
      'Completar a sequência lógica de comandos garantindo que as tochas 1, 2 e 3 sejam acesas sequencialmente antes da chamada de abertura do portão.',
    dica: 'Algoritmos são sequências finitas e ordenadas de passos lógicos. Um comando executado fora de ordem impedirá a abertura do portão.',
  },
  {
    id: 2,
    modulo_id: 1,
    nicho: 'Programação em Blocos',
    tecnologia: 'Blocos / Lógica',
    titulo: 'O Guardião da Ponte: Decisões com SE / SENÃO',
    dificuldade: 'facil',
    xp: 20,
    enunciado:
      'O Guardião da Ponte Levadiça bloqueia a passagem de qualquer viajante desarmado. Se o personagem possuir a "Chave Dourada" em seu inventário, a ponte deve descer; caso contrário, o aventureiro deve ser redirecionado pelo atalho das catacumbas.',
    codigo_inicial: `SE (inventario.possuiItem("chave_dourada") == VERDADEIRO) ENTAO
    AbaixarPonteLevadica();
    ExibirMensagem("Bem-vindo, nobre portador da chave!");
SENAO
    // TODO: Adicione o desvio de segurança caso o herói não possua a chave:
    // RedirecionarAtalhoCatacumbas();
FIM_SE`,
    criterio_aceite:
      'Implementar a estrutura condicional SE/SENÃO contemplando tanto a passagem permitida quanto o caminho alternativo de desvio.',
    dica: 'O bloco condicional avalia uma expressão booleana (Verdadeiro ou Falso) para decidir qual ramificação de código será percorrida.',
  },
  {
    id: 3,
    modulo_id: 1,
    nicho: 'Programação em Blocos',
    tecnologia: 'Blocos / Lógica',
    titulo: 'O Labirinto dos Cristais: Repetições com ENQUANTO',
    dificuldade: 'medio',
    xp: 25,
    enunciado:
      'Em uma caverna profunda, existem cristais de mana flutuando. Enquanto a barra de energia do herói for inferior a 100 pontos e ainda houver cristais na câmara, o herói deve coletar o cristal, somar 20 de energia e dar um passo à frente.',
    codigo_inicial: `let energia = 20;
let cristais_restantes = 5;

ENQUANTO (energia < 100 E cristais_restantes > 0) FACA
    ColetarCristal();
    energia = energia + 20;
    cristais_restantes = cristais_restantes - 1;
    AvancarPasso();
FIM_ENQUANTO

ExibirMensagem("Energia restaurada com sucesso!");`,
    criterio_aceite:
      'Definir a condição de parada composta do laço de repetição, garantindo que o ciclo encerre sem causar loop infinito.',
    dica: 'Certifique-se de que a variável de controle da condição seja alterada dentro do bloco a cada iteração.',
  },
  {
    id: 4,
    modulo_id: 1,
    nicho: 'Programação em Blocos',
    tecnologia: 'Blocos / Lógica',
    titulo: 'A Forja dos Autômatos: Funções e Modularização',
    dificuldade: 'dificil',
    xp: 35,
    enunciado:
      'O exército do rei precisa de autômatos de pedra para proteger as muralhas. Crie uma rotina modular (bloco de função) chamada "MontarGolem" que receba o tipo de runa e a espessura da armadura, retornando o autômato pronto para o combate.',
    codigo_inicial: `FUNCAO MontarGolem(tipo_runa, espessura_armadura)
    DefinirMaterialBase("Pedra Ancestral");
    AplicarRuna(tipo_runa);
    ForjarArmadura(espessura_armadura);
    
    // TODO: Retornar o status do autômato inicializado
    RETORNAR "Golem Criado com Runa de " + tipo_runa;
FIM_FUNCAO

// Chamada modular para 3 sentinelas:
let golem1 = MontarGolem("Fogo", 80);
let golem2 = MontarGolem("Gelo", 95);`,
    criterio_aceite:
      'Construir a função com parâmetros, encapsular os passos de criação e retornar o autômato devidamente instanciado.',
    dica: 'Funções evitam duplicação de lógica e permitem reutilizar o mesmo conjunto de blocos com valores diferentes.',
  },

  // ==========================================
  // NICHO 2: PYTHON (MÓDULO 2)
  // ==========================================
  {
    id: 5,
    modulo_id: 2,
    nicho: 'Python',
    tecnologia: 'Python',
    titulo: 'O Grimório das Variáveis: Cálculo de Dano Crítico',
    dificuldade: 'facil',
    xp: 15,
    enunciado:
      'Desenvolva uma função em Python chamada "calcular_dano_critico" que receba o dano base da espada (int), o multiplicador de acerto crítico (float) e um bônus adicional de encantamento (int), retornando o valor final do ataque desferido.',
    codigo_inicial: `def calcular_dano_critico(ataque_base: int, multiplicador: float, bonus_arma: int) -> float:
    """
    Calcula o poder final do ataque desferido contra o monstro.
    Fórmula: (ataque_base * multiplicador) + bonus_arma
    """
    # TODO: Complete a fórmula e retorne o resultado
    dano_total = (ataque_base * multiplicador) + bonus_arma
    return round(dano_total, 2)

# Exemplo de teste:
# print(calcular_dano_critico(50, 1.5, 10)) # Esperado: 85.0`,
    criterio_aceite:
      'A função deve retornar o valor numérico exato do cálculo respeitando a tipagem e precedência de operadores matemáticos.',
    dica: 'Lembre-se da ordem de operações no Python: a multiplicação ocorre antes da soma de bônus.',
  },
  {
    id: 6,
    modulo_id: 2,
    nicho: 'Python',
    tecnologia: 'Python',
    titulo: 'O Inventário do Alquimista: List Comprehension',
    dificuldade: 'medio',
    xp: 25,
    enunciado:
      'O mestre alquimista possui uma lista com diversas poções mágicas, cada uma com seu nome e nível de potência. Escreva uma função em Python utilizando List Comprehension para retornar uma lista apenas com os nomes das poções com potência estritamente maior que 50.',
    codigo_inicial: `pocoes = [
    {"nome": "Poção de Vida Menor", "potencia": 25},
    {"nome": "Elixir do Dragão", "potencia": 90},
    {"nome": "Soro da Rapidez", "potencia": 45},
    {"nome": "Infusão Astral", "potencia": 80},
    {"nome": "Chá de Ervas Comum", "potencia": 10}
]

def filtrar_pocoes_raras(inventario: list[dict]) -> list[str]:
    # TODO: Utilize list comprehension para extrair os nomes das poções com potencia > 50
    return [item["nome"] for item in inventario if item["potencia"] > 50]

print(filtrar_pocoes_raras(pocoes))`,
    criterio_aceite:
      'Retornar exatamente a lista de strings com os nomes das poções cuja propriedade "potencia" exceda 50 pontos.',
    dica: 'A sintaxe [expressao for item in colecao if condicao] torna a filtragem em Python muito concisa e legível.',
  },
  {
    id: 7,
    modulo_id: 2,
    nicho: 'Python',
    tecnologia: 'Python',
    titulo: 'O Dicionário de Feitiços: Tratamento de Exceções',
    dificuldade: 'medio',
    xp: 25,
    enunciado:
      'Crie uma função "invocar_magia(grimorio, nome_magia)" que consulte um dicionário de magias cadastradas. Caso o feitiço não exista no grimório, capture o erro com try/except e retorne uma mensagem elegante alertando que a magia não foi aprendida.',
    codigo_inicial: `grimorio_mago = {
    "bola_de_fogo": {"dano": 120, "custo_mana": 30},
    "escudo_arcano": {"defesa": 80, "custo_mana": 20},
    "raio_congelante": {"dano": 95, "custo_mana": 25}
}

def invocar_magia(grimorio: dict, nome_magia: str) -> str:
    try:
        dados = grimorio[nome_magia]
        return f"Magia {nome_magia} invocada com sucesso! Custo de mana: {dados['custo_mana']}."
    except KeyError:
        return f"Atenção: A magia '{nome_magia}' não está inscrita em seu grimório!"

# Testes:
print(invocar_magia(grimorio_mago, "bola_de_fogo"))
print(invocar_magia(grimorio_mago, "chuva_de_meteoros"))`,
    criterio_aceite:
      'Tratar adequadamente o erro KeyError sem interromper a execução do script caso a chave não exista no dicionário.',
    dica: 'O bloco try...except KeyError é a forma idiomática em Python (EAFP: Easier to Ask for Forgiveness than Permission) para tratar chaves inexistentes.',
  },
  {
    id: 8,
    modulo_id: 2,
    nicho: 'Python',
    tecnologia: 'Python',
    titulo: 'A Forja dos Heróis: Classes e POO em Python',
    dificuldade: 'dificil',
    xp: 35,
    enunciado:
      'Modele a classe "PersonagemRPG" com os atributos nome (str), classe_personagem (str), vida (int) e poder (int). Adicione os métodos "receber_dano(dano: int)" (que não permite a vida ficar abaixo de zero) e "esta_vivo() -> bool".',
    codigo_inicial: `class PersonagemRPG:
    def __init__(self, nome: str, classe_personagem: str, vida: int = 100, poder: int = 50):
        self.nome = nome
        self.classe_personagem = classe_personagem
        self.vida = max(0, vida)
        self.poder = poder

    def receber_dano(self, dano: int) -> int:
        self.vida = max(0, self.vida - dano)
        return self.vida

    def esta_vivo(self) -> bool:
        return self.vida > 0

    def __repr__(self) -> str:
        return f"<{self.nome} ({self.classe_personagem}) - HP: {self.vida}/100 - Poder: {self.poder}>"

heroi = PersonagemRPG("Geralt", "Bruxo", 100, 85)
heroi.receber_dano(40)
print(heroi, "Vivo:", heroi.esta_vivo())`,
    criterio_aceite:
      'Instanciar a classe com encapsulamento correto e assegurar que a barra de vida nunca assuma valores negativos.',
    dica: 'Utilize a função nativa max(0, self.vida - dano) para garantir que a vida atinja no mínimo zero.',
  },

  // ==========================================
  // NICHO 3: HTML E CSS (MÓDULO 3)
  // ==========================================
  {
    id: 9,
    modulo_id: 3,
    nicho: 'HTML e CSS',
    tecnologia: 'HTML/CSS',
    titulo: 'A Forja Semântica: O Pergaminho de Missão',
    dificuldade: 'facil',
    xp: 15,
    enunciado:
      'Crie a marcação HTML5 semântica e acessível para apresentar uma missão de RPG. Use elementos estruturais nativos como <article>, <header>, <section>, <ul>, <li> e <footer>, sem recorrer a divisões genéricas vazias de significado.',
    codigo_inicial: `<!-- Pergaminho Semântico de Missão (HTML5) -->
<article class="card-missao" aria-labelledby="titulo-missao">
  <header class="cabecalho-missao">
    <h2 id="titulo-missao">O Resgate no Pântano das Sombras</h2>
    <span class="badge badge-dificuldade">Médio</span>
  </header>

  <section class="descricao-missao">
    <p>Aventureiros devem adentrar a floresta e recuperar o artefato da deusa élfica.</p>
    <h3>Recompensas:</h3>
    <ul>
      <li>500 Moedas de Ouro</li>
      <li>Espada do Relâmpago</li>
    </ul>
  </section>

  <footer class="rodape-missao">
    <button type="button" class="btn-aceitar">Aceitar Desafio</button>
  </footer>
</article>`,
    criterio_aceite:
      'Utilizar tags semânticas do HTML5 adequadamente e incluir atributos de acessibilidade como aria-labelledby.',
    dica: 'Tags semânticas melhoram a indexação em motores de busca (SEO) e permitem que leitores de tela guiem usuários com deficiência visual.',
  },
  {
    id: 10,
    modulo_id: 3,
    nicho: 'HTML e CSS',
    tecnologia: 'HTML/CSS',
    titulo: 'O Escudo Flexbox: Grid de Inventário Alinhado',
    dificuldade: 'medio',
    xp: 25,
    enunciado:
      'Escreva as regras CSS utilizando Flexbox e CSS Grid para estilizar um painel de inventário com 6 slots de itens mágicos. Os slots devem ficar perfeitamente alinhados, com espaçamento regular (gap) e efeito de realce (hover) com borda néon.',
    codigo_inicial: `.inventario-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 16px;
  padding: 20px;
  background-color: #0f172a;
  border-radius: 12px;
  border: 1px solid #334155;
}

.slot-item {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  background-color: #1e293b;
  border: 2px solid #475569;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.slot-item:hover {
  border-color: #6366f1;
  box-shadow: 0 0 12px rgba(99, 102, 241, 0.4);
  transform: translateY(-2px);
}`,
    criterio_aceite:
      'Garantir layout fluido com CSS Grid auto-fit, centralização com Flexbox e transição suave no estado hover.',
    dica: 'A propriedade aspect-ratio: 1 / 1 garante que os slots permaneçam perfeitamente quadrados em qualquer largura de tela.',
  },
  {
    id: 11,
    modulo_id: 3,
    nicho: 'HTML e CSS',
    tecnologia: 'HTML/CSS',
    titulo: 'A Barra de Mana Animada: Keyframes e Gradientes',
    dificuldade: 'medio',
    xp: 25,
    enunciado:
      'Desenvolva a animação CSS de uma barra de energia mágica (Mana) com degradê dinâmico (linear-gradient) e uma animação contínua @keyframes que simule a pulsação mística da magia.',
    codigo_inicial: `@keyframes pulsarMana {
  0% {
    filter: brightness(1) drop-shadow(0 0 4px #06b6d4);
  }
  100% {
    filter: brightness(1.3) drop-shadow(0 0 12px #3b82f6);
  }
}

.barra-mana-container {
  width: 100%;
  height: 24px;
  background-color: #0f172a;
  border-radius: 9999px;
  overflow: hidden;
  border: 1px solid #1e3a8a;
}

.barra-mana-fill {
  width: 75%;
  height: 100%;
  background: linear-gradient(90deg, #06b6d4, #3b82f6);
  animation: pulsarMana 1.8s infinite alternate ease-in-out;
  transition: width 0.5s ease;
}`,
    criterio_aceite:
      'Criar o gradiente linear com tons de ciano/azul e animar a propriedade filter sem provocar reflow desnecessário.',
    dica: 'Animar filtros e sombras é mais performático na GPU do que alterar larguras ou posições a cada frame.',
  },
  {
    id: 12,
    modulo_id: 3,
    nicho: 'HTML e CSS',
    tecnologia: 'HTML/CSS',
    titulo: 'O Tema Escuro do RPG: Custom Properties e Media Queries',
    dificuldade: 'dificil',
    xp: 35,
    enunciado:
      'Construa um sistema de temas em CSS puro utilizando variáveis customizadas (:root) e Media Query @media (min-width: 768px) para garantir que a interface do personagem se adapte perfeitamente entre dispositivos móveis e desktops.',
    codigo_inicial: `:root {
  --rpg-bg: #090d16;
  --rpg-surface: #111827;
  --rpg-primary: #6366f1;
  --rpg-accent: #06b6d4;
  --rpg-text: #f8fafc;
  --rpg-border: #1f2937;
}

.painel-personagem {
  background-color: var(--rpg-surface);
  color: var(--rpg-text);
  border: 1px solid var(--rpg-border);
  padding: 1rem;
  border-radius: 0.75rem;
}

@media (min-width: 768px) {
  .painel-personagem {
    padding: 2rem;
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 1.5rem;
  }
}`,
    criterio_aceite:
      'Utilizar variáveis CSS nativas e adaptar a disposição de coluna única (mobile) para grade de duas colunas (desktop).',
    dica: 'Variáveis CSS facilitam a manutenção e permitem trocar cores em todo o aplicativo alterando apenas o :root.',
  },

  // ==========================================
  // NICHO 4: JAVASCRIPT (MÓDULO 4)
  // ==========================================
  {
    id: 13,
    modulo_id: 4,
    nicho: 'JavaScript',
    tecnologia: 'JavaScript',
    titulo: 'O Golpe do Dragão: Funções e Multiplicadores',
    dificuldade: 'facil',
    xp: 15,
    enunciado:
      'Crie a função JavaScript "calcularExperienciaVitoria(nivelPersonagem, monstrosDerrotados)" que calcule o montante de experiência ganho em uma batalha. Cada monstro rende 50 XP base, multiplicado por um bônus de 10% por nível do personagem.',
    codigo_inicial: `function calcularExperienciaVitoria(nivelPersonagem, monstrosDerrotados) {
  const XP_BASE = 50;
  const bonusNivel = 1 + (nivelPersonagem * 0.1);
  
  // TODO: Calcule e retorne o total arredondado
  const totalXp = Math.round(monstrosDerrotados * XP_BASE * bonusNivel);
  return totalXp;
}

// Teste rápido:
console.log(calcularExperienciaVitoria(5, 4)); // Esperado: 300 XP`,
    criterio_aceite:
      'A função deve retornar um número inteiro representando o total ponderado de pontos de experiência.',
    dica: 'Use Math.round() para garantir que o resultado final seja um valor inteiro amigável para a pontuação de XP.',
  },
  {
    id: 14,
    modulo_id: 4,
    nicho: 'JavaScript',
    tecnologia: 'JavaScript',
    titulo: 'O Feitiço dos Eventos: Manipulação de DOM',
    dificuldade: 'medio',
    xp: 25,
    enunciado:
      'Escreva o script JavaScript para controlar um botão de cura. Quando o jogador clicar no botão "#btn-pocao", a barra de vida deve aumentar em 20 pontos (sem ultrapassar 100), e o texto do elemento "#texto-hp" deve ser atualizado instantaneamente.',
    codigo_inicial: `function inicializarPocaoDeVida() {
  const botao = document.getElementById('btn-pocao');
  const spanHp = document.getElementById('texto-hp');
  let vidaAtual = 60;

  botao.addEventListener('click', () => {
    // Cura de 20 pontos com limite máximo de 100:
    vidaAtual = Math.min(100, vidaAtual + 20);
    spanHp.textContent = vidaAtual + ' / 100 HP';
    
    if (vidaAtual === 100) {
      botao.disabled = true;
      botao.textContent = 'Vida Completa!';
    }
  });
}`,
    criterio_aceite:
      'Adicionar o ouvinte de evento "click", limitar o valor superior a 100 com Math.min e atualizar o nó de texto no DOM.',
    dica: 'Math.min(100, valor) é a maneira mais limpa de aplicar um teto máximo sem múltiplos comandos condicionais.',
  },
  {
    id: 15,
    modulo_id: 4,
    nicho: 'JavaScript',
    tecnologia: 'JavaScript',
    titulo: 'O Códice dos Magos: filter, map e reduce',
    dificuldade: 'medio',
    xp: 25,
    enunciado:
      'Dada uma lista de aventureiros com nome, classe e poder, utilize os métodos funcionais de array ("filter", "map" e "reduce") para calcular o poder médio exclusivamente dos personagens pertencentes à classe "Mago".',
    codigo_inicial: `const grupoAventureiros = [
  { nome: 'Gandalf', classe: 'Mago', poder: 95 },
  { nome: 'Aragorn', classe: 'Guerreiro', poder: 90 },
  { nome: 'Raistlin', classe: 'Mago', poder: 85 },
  { nome: 'Legolas', classe: 'Arqueiro', poder: 88 },
  { nome: 'Hermione', classe: 'Mago', poder: 90 }
];

function calcularMediaPoderMagos(aventureiros) {
  // 1. Filtrar magos:
  const magos = aventureiros.filter(h => h.classe === 'Mago');
  if (magos.length === 0) return 0;

  // 2. Somar poder com reduce:
  const somaPoder = magos.reduce((acumulador, mago) => acumulador + mago.poder, 0);

  // 3. Retornar a média arredondada:
  return Math.round(somaPoder / magos.length);
}

console.log('Média de Poder dos Magos:', calcularMediaPoderMagos(grupoAventureiros));`,
    criterio_aceite:
      'Utilizar filter e reduce para extrair o subconjunto correto e calcular a média ponderada com precisão.',
    dica: 'Métodos modernos de array não mutam o array original e mantêm o código declarativo e testável.',
  },
  {
    id: 16,
    modulo_id: 4,
    nicho: 'JavaScript',
    tecnologia: 'JavaScript',
    titulo: 'A Invocação Assíncrona: Consumo de API do GitHub',
    dificuldade: 'dificil',
    xp: 35,
    enunciado:
      'Implemente a função assíncrona "buscarGrimorioGitHub(username)" que utiliza a Fetch API moderna com suporte a timeout de 3 segundos via AbortController e tratamento de erros com try/catch/finally para recuperar o perfil público do desenvolvedor.',
    codigo_inicial: `async function buscarGrimorioGitHub(username) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);

  try {
    const resposta = await fetch(\`https://api.github.com/users/\${encodeURIComponent(username)}\`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });

    if (!resposta.ok) {
      throw new Error(\`Falha na requisição: status \${resposta.status}\`);
    }

    const dados = await resposta.json();
    return {
      sucesso: true,
      login: dados.login,
      repos: dados.public_repos,
      avatar: dados.avatar_url
    };
  } catch (erro) {
    return {
      sucesso: false,
      mensagem: erro.name === 'AbortError' ? 'Timeout excedido (3s)' : erro.message
    };
  } finally {
    clearTimeout(timer);
  }
}`,
    criterio_aceite:
      'Utilizar async/await, AbortController com temporizador de 3s e limpeza adequada com clearTimeout no bloco finally.',
    dica: 'Sempre limpe os temporizadores no bloco finally para evitar vazamentos de memória em ambientes assíncronos.',
  },
];

