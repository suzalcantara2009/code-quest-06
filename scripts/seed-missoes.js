const fs = require('fs');
const path = require('path');

// Carregar variáveis de ambiente do .env
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      process.env[key] = val;
    }
  });
}

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const modulosData = [
  {
    id: 1,
    ordem: 1,
    titulo: 'Módulo 1 — Programação em Blocos',
    tecnologia: 'Blocos / Lógica',
    descricao: 'Fundamentos de lógica algorítmica, variáveis, estruturas condicionais e laços de repetição visuais.',
  },
  {
    id: 2,
    ordem: 2,
    titulo: 'Módulo 2 — Python',
    tecnologia: 'Python',
    descricao: 'Sintaxe limpa, estruturas de dados, funções, loops e modelagem orientada a objetos com scripts eficientes.',
  },
  {
    id: 3,
    ordem: 3,
    titulo: 'Módulo 3 — HTML e CSS',
    tecnologia: 'HTML/CSS',
    descricao: 'Estruturação semântica, acessibilidade web, responsividade, Flexbox, Grid e animações visuais.',
  },
  {
    id: 4,
    ordem: 4,
    titulo: 'Módulo 4 — JavaScript',
    tecnologia: 'JavaScript',
    descricao: 'Interatividade no navegador, manipulação de eventos e DOM, arrays modernos e consumo de APIs assíncronas.',
  },
];

const missoesData = [
  // Módulo 1: Blocos
  {
    id: 1,
    modulo_id: 1,
    titulo: 'O Despertar do Algoritmo: A Sequência de Passos',
    dificuldade: 'facil',
    enunciado: 'Para abrir o Portão Ancestral da Cidadela dos Magos, o jovem herói precisa acender 3 tochas sagradas rigorosamente na ordem sequencial. Monte a sequência lógica de passos para mover o avatar e acender cada uma das tochas sem pular etapas.',
    codigo_inicial: '// [BLOCO INICIAL - SEQUÊNCIA DE AÇÕES]\nMoverFrente(2);\nAcenderTocha(1);\nMoverFrente(3);\nAcenderTocha(2);\nAbrirPortaoAncestral();',
    criterio_aceite: 'Completar a sequência lógica de comandos garantindo que as tochas 1, 2 e 3 sejam acesas sequencialmente antes da chamada de abertura do portão.',
  },
  {
    id: 2,
    modulo_id: 1,
    titulo: 'O Guardião da Ponte: Decisões com SE / SENÃO',
    dificuldade: 'facil',
    enunciado: 'O Guardião da Ponte Levadiça bloqueia a passagem de qualquer viajante desarmado. Se o personagem possuir a "Chave Dourada" em seu inventário, a ponte deve descer; caso contrário, o aventureiro deve ser redirecionado pelo atalho das catacumbas.',
    codigo_inicial: 'SE (inventario.possuiItem("chave_dourada") == VERDADEIRO) ENTAO\n    AbaixarPonteLevadica();\nSENAO\n    RedirecionarAtalhoCatacumbas();\nFIM_SE',
    criterio_aceite: 'Implementar a estrutura condicional SE/SENÃO contemplando tanto a passagem permitida quanto o caminho alternativo de desvio.',
  },
  {
    id: 3,
    modulo_id: 1,
    titulo: 'O Labirinto dos Cristais: Repetições com ENQUANTO',
    dificuldade: 'medio',
    enunciado: 'Em uma caverna profunda, existem cristais de mana flutuando. Enquanto a barra de energia do herói for inferior a 100 pontos e ainda houver cristais na câmara, o herói deve coletar o cristal, somar 20 de energia e dar um passo à frente.',
    codigo_inicial: 'let energia = 20;\nlet cristais_restantes = 5;\nENQUANTO (energia < 100 E cristais_restantes > 0) FACA\n    ColetarCristal();\n    energia = energia + 20;\n    cristais_restantes = cristais_restantes - 1;\n    AvancarPasso();\nFIM_ENQUANTO',
    criterio_aceite: 'Definir a condição de parada composta do laço de repetição, garantindo que o ciclo encerre sem causar loop infinito.',
  },
  {
    id: 4,
    modulo_id: 1,
    titulo: 'A Forja dos Autômatos: Funções e Modularização',
    dificuldade: 'dificil',
    enunciado: 'O exército do rei precisa de autômatos de pedra para proteger as muralhas. Crie uma rotina modular (bloco de função) chamada "MontarGolem" que receba o tipo de runa e a espessura da armadura, retornando o autômato pronto para o combate.',
    codigo_inicial: 'FUNCAO MontarGolem(tipo_runa, espessura_armadura)\n    DefinirMaterialBase("Pedra Ancestral");\n    AplicarRuna(tipo_runa);\n    ForjarArmadura(espessura_armadura);\n    RETORNAR "Golem Criado com Runa de " + tipo_runa;\nFIM_FUNCAO',
    criterio_aceite: 'Construir a função com parâmetros, encapsular os passos de criação e retornar o autômato devidamente instanciado.',
  },

  // Módulo 2: Python
  {
    id: 5,
    modulo_id: 2,
    titulo: 'O Grimório das Variáveis: Cálculo de Dano Crítico',
    dificuldade: 'facil',
    enunciado: 'Desenvolva uma função em Python chamada "calcular_dano_critico" que receba o dano base da espada (int), o multiplicador de acerto crítico (float) e um bônus adicional de encantamento (int), retornando o valor final do ataque desferido.',
    codigo_inicial: 'def calcular_dano_critico(ataque_base: int, multiplicador: float, bonus_arma: int) -> float:\n    dano_total = (ataque_base * multiplicador) + bonus_arma\n    return round(dano_total, 2)',
    criterio_aceite: 'A função deve retornar o valor numérico exato do cálculo respeitando a tipagem e precedência de operadores matemáticos.',
  },
  {
    id: 6,
    modulo_id: 2,
    titulo: 'O Inventário do Alquimista: List Comprehension',
    dificuldade: 'medio',
    enunciado: 'O mestre alquimista possui uma lista com diversas poções mágicas, cada uma com seu nome e nível de potência. Escreva uma função em Python utilizando List Comprehension para retornar uma lista apenas com os nomes das poções com potência estritamente maior que 50.',
    codigo_inicial: 'def filtrar_pocoes_raras(inventario: list[dict]) -> list[str]:\n    return [item["nome"] for item in inventario if item["potencia"] > 50]',
    criterio_aceite: 'Retornar exatamente a lista de strings com os nomes das poções cuja propriedade "potencia" exceda 50 pontos.',
  },
  {
    id: 7,
    modulo_id: 2,
    titulo: 'O Dicionário de Feitiços: Tratamento de Exceções',
    dificuldade: 'medio',
    enunciado: 'Crie uma função "invocar_magia(grimorio, nome_magia)" que consulte um dicionário de magias cadastradas. Caso o feitiço não exista no grimório, capture o erro com try/except e retorne uma mensagem elegante alertando que a magia não foi aprendida.',
    codigo_inicial: 'def invocar_magia(grimorio: dict, nome_magia: str) -> str:\n    try:\n        dados = grimorio[nome_magia]\n        return f"Magia {nome_magia} invocada com sucesso! Custo de mana: {dados[\'custo_mana\']}."\n    except KeyError:\n        return f"Atenção: A magia \'{nome_magia}\' não está inscrita em seu grimório!"',
    criterio_aceite: 'Tratar adequadamente o erro KeyError sem interromper a execução do script caso a chave não exista no dicionário.',
  },
  {
    id: 8,
    modulo_id: 2,
    titulo: 'A Forja dos Heróis: Classes e POO em Python',
    dificuldade: 'dificil',
    enunciado: 'Modele a classe "PersonagemRPG" com os atributos nome (str), classe_personagem (str), vida (int) e poder (int). Adicione os métodos "receber_dano(dano: int)" (que não permite a vida ficar abaixo de zero) e "esta_vivo() -> bool".',
    codigo_inicial: 'class PersonagemRPG:\n    def __init__(self, nome: str, classe_personagem: str, vida: int = 100, poder: int = 50):\n        self.nome = nome\n        self.classe_personagem = classe_personagem\n        self.vida = max(0, vida)\n        self.poder = poder\n\n    def receber_dano(self, dano: int) -> int:\n        self.vida = max(0, self.vida - dano)\n        return self.vida\n\n    def esta_vivo(self) -> bool:\n        return self.vida > 0',
    criterio_aceite: 'Instanciar a classe com encapsulamento correto e assegurar que a barra de vida nunca assuma valores negativos.',
  },

  // Módulo 3: HTML e CSS
  {
    id: 9,
    modulo_id: 3,
    titulo: 'A Forja Semântica: O Pergaminho de Missão',
    dificuldade: 'facil',
    enunciado: 'Crie a marcação HTML5 semântica e acessível para apresentar uma missão de RPG. Use elementos estruturais nativos como <article>, <header>, <section>, <ul>, <li> e <footer>, sem recorrer a divisões genéricas vazias de significado.',
    codigo_inicial: '<article class="card-missao" aria-labelledby="titulo-missao">\n  <header class="cabecalho-missao">\n    <h2 id="titulo-missao">O Resgate no Pântano</h2>\n  </header>\n  <section class="conteudo">\n    <p>Objetivo da missão e recompensas.</p>\n  </section>\n</article>',
    criterio_aceite: 'Utilizar tags semânticas do HTML5 adequadamente e incluir atributos de acessibilidade como aria-labelledby.',
  },
  {
    id: 10,
    modulo_id: 3,
    titulo: 'O Escudo Flexbox: Grid de Inventário Alinhado',
    dificuldade: 'medio',
    enunciado: 'Escreva as regras CSS utilizando Flexbox e CSS Grid para estilizar um painel de inventário com 6 slots de itens mágicos. Os slots devem ficar perfeitamente alinhados, com espaçamento regular (gap) e efeito de realce (hover) com borda néon.',
    codigo_inicial: '.inventario-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));\n  gap: 16px;\n  padding: 20px;\n}\n.slot-item:hover {\n  border-color: #6366f1;\n  box-shadow: 0 0 12px rgba(99, 102, 241, 0.4);\n}',
    criterio_aceite: 'Garantir layout fluido com CSS Grid auto-fit, centralização com Flexbox e transição suave no estado hover.',
  },
  {
    id: 11,
    modulo_id: 3,
    titulo: 'A Barra de Mana Animada: Keyframes e Gradientes',
    dificuldade: 'medio',
    enunciado: 'Desenvolva a animação CSS de uma barra de energia mágica (Mana) com degradê dinâmico (linear-gradient) e uma animação contínua @keyframes que simule a pulsação mística da magia.',
    codigo_inicial: '@keyframes pulsarMana {\n  0% { filter: brightness(1); }\n  100% { filter: brightness(1.3); }\n}\n.barra-mana-fill {\n  background: linear-gradient(90deg, #06b6d4, #3b82f6);\n  animation: pulsarMana 1.8s infinite alternate ease-in-out;\n}',
    criterio_aceite: 'Criar o gradiente linear com tons de ciano/azul e animar a propriedade filter sem provocar reflow desnecessário.',
  },
  {
    id: 12,
    modulo_id: 3,
    titulo: 'O Tema Escuro do RPG: Custom Properties e Media Queries',
    dificuldade: 'dificil',
    enunciado: 'Construa um sistema de temas em CSS puro utilizando variáveis customizadas (:root) e Media Query @media (min-width: 768px) para garantir que a interface do personagem se adapte perfeitamente entre dispositivos móveis e desktops.',
    codigo_inicial: ':root {\n  --rpg-bg: #090d16;\n  --rpg-surface: #111827;\n  --rpg-primary: #6366f1;\n}\n@media (min-width: 768px) {\n  .painel-personagem { display: grid; grid-template-columns: 240px 1fr; }\n}',
    criterio_aceite: 'Utilizar variáveis CSS nativas e adaptar a disposição de coluna única (mobile) para grade de duas colunas (desktop).',
  },

  // Módulo 4: JavaScript
  {
    id: 13,
    modulo_id: 4,
    titulo: 'O Golpe do Dragão: Funções e Multiplicadores',
    dificuldade: 'facil',
    enunciado: 'Crie a função JavaScript "calcularExperienciaVitoria(nivelPersonagem, monstrosDerrotados)" que calcule o montante de experiência ganho em uma batalha. Cada monstro rende 50 XP base, multiplicado por um bônus de 10% por nível do personagem.',
    codigo_inicial: 'function calcularExperienciaVitoria(nivelPersonagem, monstrosDerrotados) {\n  const XP_BASE = 50;\n  const bonusNivel = 1 + (nivelPersonagem * 0.1);\n  return Math.round(monstrosDerrotados * XP_BASE * bonusNivel);\n}',
    criterio_aceite: 'A função deve retornar um número inteiro representando o total ponderado de pontos de experiência.',
  },
  {
    id: 14,
    modulo_id: 4,
    titulo: 'O Feitiço dos Eventos: Manipulação de DOM',
    dificuldade: 'medio',
    enunciado: 'Escreva o script JavaScript para controlar um botão de cura. Quando o jogador clicar no botão "#btn-pocao", a barra de vida deve aumentar em 20 pontos (sem ultrapassar 100), e o texto do elemento "#texto-hp" deve ser atualizado instantaneamente.',
    codigo_inicial: 'function inicializarPocaoDeVida() {\n  const botao = document.getElementById("btn-pocao");\n  const spanHp = document.getElementById("texto-hp");\n  let vidaAtual = 60;\n  botao.addEventListener("click", () => {\n    vidaAtual = Math.min(100, vidaAtual + 20);\n    spanHp.textContent = vidaAtual + " / 100 HP";\n  });\n}',
    criterio_aceite: 'Adicionar o ouvinte de evento "click", limitar o valor superior a 100 com Math.min e atualizar o nó de texto no DOM.',
  },
  {
    id: 15,
    modulo_id: 4,
    titulo: 'O Códice dos Magos: filter, map e reduce',
    dificuldade: 'medio',
    enunciado: 'Dada uma lista de aventureiros com nome, classe e poder, utilize os métodos funcionais de array ("filter", "map" e "reduce") para calcular o poder médio exclusivamente dos personagens pertencentes à classe "Mago".',
    codigo_inicial: 'function calcularMediaPoderMagos(aventureiros) {\n  const magos = aventureiros.filter(h => h.classe === "Mago");\n  if (magos.length === 0) return 0;\n  const somaPoder = magos.reduce((acc, m) => acc + m.poder, 0);\n  return Math.round(somaPoder / magos.length);\n}',
    criterio_aceite: 'Utilizar filter e reduce para extrair o subconjunto correto e calcular a média ponderada com precisão.',
  },
  {
    id: 16,
    modulo_id: 4,
    titulo: 'A Invocação Assíncrona: Consumo de API do GitHub',
    dificuldade: 'dificil',
    enunciado: 'Implemente a função assíncrona "buscarGrimorioGitHub(username)" que utiliza a Fetch API moderna com suporte a timeout de 3 segundos via AbortController e tratamento de erros com try/catch/finally para recuperar o perfil público do desenvolvedor.',
    codigo_inicial: 'async function buscarGrimorioGitHub(username) {\n  const controller = new AbortController();\n  const timer = setTimeout(() => controller.abort(), 3000);\n  try {\n    const res = await fetch(`https://api.github.com/users/${username}`, { signal: controller.signal });\n    if (!res.ok) throw new Error("Erro na API");\n    return await res.json();\n  } finally {\n    clearTimeout(timer);\n  }\n}',
    criterio_aceite: 'Utilizar async/await, AbortController com temporizador de 3s e limpeza adequada com clearTimeout no bloco finally.',
  },
];

async function seed() {
  console.log('--- Iniciando Seed de Módulos e Missões ---');

  for (const m of modulosData) {
    await prisma.modulo.upsert({
      where: { id: m.id },
      update: {
        ordem: m.ordem,
        titulo: m.titulo,
        tecnologia: m.tecnologia,
        descricao: m.descricao,
      },
      create: m,
    });
    console.log(`✓ Módulo gravado: ${m.titulo}`);
  }

  for (const missao of missoesData) {
    await prisma.missao.upsert({
      where: { id: missao.id },
      update: {
        modulo_id: missao.modulo_id,
        titulo: missao.titulo,
        dificuldade: missao.dificuldade,
        enunciado: missao.enunciado,
        codigo_inicial: missao.codigo_inicial,
        criterio_aceite: missao.criterio_aceite,
      },
      create: missao,
    });
    console.log(`✓ Missão #${missao.id} gravada: ${missao.titulo}`);
  }

  const countModulos = await prisma.modulo.count();
  const countMissoes = await prisma.missao.count();
  console.log(`\n🎉 SEED CONCLUÍDO COM SUCESSO! Total Módulos: ${countModulos}, Total Missões: ${countMissoes}`);
}

seed()
  .catch((e) => {
    console.error('Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

