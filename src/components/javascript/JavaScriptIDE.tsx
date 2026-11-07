'use client';

import React, { useState, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Code2,
  Terminal,
  Zap,
  BookOpen,
  ArrowRight,
  Layers,
  Cpu,
  MousePointerClick,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface DesafioJavaScript {
  id: number;
  titulo: string;
  dificuldade: 'facil' | 'medio' | 'dificil';
  xp: number;
  descricao: string;
  objetivo: string;
  dica: string;
  equivalenteBlocos: string;
  equivalentePython: string;
  codigoInicial: string;
  testes: {
    nome: string;
    executar: (codigo: string) => { aprovado: boolean; log: string };
  }[];
}

export const DESAFIOS_JAVASCRIPT: DesafioJavaScript[] = [
  {
    id: 1,
    titulo: 'Fase 1: O Registro do Aventureiro (let e const)',
    dificuldade: 'facil',
    xp: 15,
    descricao:
      'Declare a constante REINO com o nome do reino e uma variável let para o herói. Imprima a mensagem de boas-vindas no console usando template literal.',
    objetivo:
      'Utilize const para valores imutáveis, let para dados que variam e console.log() com interpolação de strings `${heroi}`.',
    dica: 'Em JavaScript usamos a crase `Olá ${nome}` para interpolar variáveis dentro da string.',
    equivalenteBlocos: 'Blocos [defina {reino} para ("Avalon")] e [diga (junte "Herói: " e {nome})]',
    equivalentePython: 'REINO = "Avalon"\nheroi = "Arthur"\nprint(f"Bem-vindo {heroi} a {REINO}")',
    codigoInicial: `// Desafio 1: Variáveis e Console
const REINO = "Avalon";
let heroi = "Arthur";
let nivel = 1;

// TODO: Imprima no console a frase formatada:
console.log(\`Bem-vindo, \${heroi}! Você está no reino de \${REINO} no nível \${nivel}.\`);`,
    testes: [
      {
        nome: 'Declara constante REINO e variável heroi',
        executar: (code) => {
          const temConst = /const\s+REINO/i.test(code);
          const temLet = /let\s+heroi/i.test(code);
          return {
            aprovado: temConst && temLet,
            log: temConst && temLet ? 'const e let declarados corretamente.' : 'Declare const REINO e let heroi.',
          };
        },
      },
      {
        nome: 'Utiliza console.log() com interpolação',
        executar: (code) => {
          const temLog = /console\.log\s*\(/i.test(code);
          const temTemplate = /`[^`]*\${[^}]+}[^`]*`/.test(code);
          return {
            aprovado: temLog && temTemplate,
            log: temLog && temTemplate ? 'Mensagem formatada com template literal.' : 'Use crase ` e ${} no console.log.',
          };
        },
      },
    ],
  },
  {
    id: 2,
    titulo: 'Fase 2: O Golpe do Dragão (Funções)',
    dificuldade: 'facil',
    xp: 20,
    descricao:
      'Crie a função calcularExperienciaVitoria(nivel, monstros) que receba o nível do personagem e a quantidade de monstros, retornando o total ponderado de XP.',
    objetivo:
      'Cada monstro rende 50 XP base, multiplicado pelo fator (1 + nivel * 0.1). Retorne o valor com Math.round().',
    dica: 'Use a palavra-chave function ou arrow function const func = (a, b) => ... e lembre-se do return.',
    equivalenteBlocos: 'Bloco de função [definir calcularExperienciaVitoria com (nivel, monstros)]',
    equivalentePython: 'def calcular_experiencia(nivel, monstros):\n    return round(monstros * 50 * (1 + nivel * 0.1))',
    codigoInicial: `function calcularExperienciaVitoria(nivel, monstros) {
  const XP_BASE = 50;
  const multiplicador = 1 + (nivel * 0.1);
  
  // TODO: Calcule e retorne o total arredondado com Math.round:
  const total = monstros * XP_BASE * multiplicador;
  return Math.round(total);
}

// Teste rápido:
console.log("XP Nível 5 com 4 monstros:", calcularExperienciaVitoria(5, 4));`,
    testes: [
      {
        nome: 'Retorna 300 XP para nível 5 e 4 monstros',
        executar: (code) => {
          try {
            const func = new Function(`${code}; return calcularExperienciaVitoria(5, 4);`);
            const res = func();
            return {
              aprovado: res === 300,
              log: res === 300 ? 'Esperado 300, obteve 300.' : `Esperado 300, mas obteve: ${res}`,
            };
          } catch (e: any) {
            return { aprovado: false, log: `Erro na execução: ${e.message}` };
          }
        },
      },
      {
        nome: 'Retorna 110 XP para nível 1 e 2 monstros',
        executar: (code) => {
          try {
            const func = new Function(`${code}; return calcularExperienciaVitoria(1, 2);`);
            const res = func();
            return {
              aprovado: res === 110,
              log: res === 110 ? 'Esperado 110, obteve 110.' : `Esperado 110, mas obteve: ${res}`,
            };
          } catch (e: any) {
            return { aprovado: false, log: `Erro na execução: ${e.message}` };
          }
        },
      },
    ],
  },
  {
    id: 3,
    titulo: 'Fase 3: A Chave do Santuário (Condicionais Lógicas)',
    dificuldade: 'medio',
    xp: 25,
    descricao:
      'Implemente a função podeEntrarSantuario(nivel, temChave, mana). A entrada é permitida se o herói tiver nível >= 10 E possuir a chave, OU se tiver pelo menos 100 pontos de mana.',
    objetivo:
      'Utilize os operadores lógicos && (E) e || (OU) para avaliar as regras arcanas de acesso.',
    dica: 'A precedência do && é maior que ||, mas envolva com parênteses (nivel >= 10 && temChave) || mana >= 100 para clareza.',
    equivalenteBlocos: 'Blocos lógicos verdes [<e>] e [<ou>] encaixados dentro do bloco [se]',
    equivalentePython: 'def pode_entrar(nivel, tem_chave, mana):\n    return (nivel >= 10 and tem_chave) or mana >= 100',
    codigoInicial: `function podeEntrarSantuario(nivel, temChave, mana) {
  // TODO: Retorne true se (nivel >= 10 E temChave) OU mana >= 100, senão false
  return (nivel >= 10 && temChave === true) || mana >= 100;
}

// Exemplos de teste:
console.log("Acesso 1:", podeEntrarSantuario(12, true, 20)); // Esperado: true
console.log("Acesso 2:", podeEntrarSantuario(5, false, 120)); // Esperado: true
console.log("Acesso 3:", podeEntrarSantuario(8, false, 40));  // Esperado: false`,
    testes: [
      {
        nome: 'Permite acesso com nível 12 e chave',
        executar: (code) => {
          try {
            const func = new Function(`${code}; return podeEntrarSantuario(12, true, 20);`);
            const res = func();
            return { aprovado: res === true, log: `Retornou ${res} (esperado true)` };
          } catch (e: any) {
            return { aprovado: false, log: e.message };
          }
        },
      },
      {
        nome: 'Permite acesso com mana >= 100 mesmo sem chave',
        executar: (code) => {
          try {
            const func = new Function(`${code}; return podeEntrarSantuario(5, false, 120);`);
            const res = func();
            return { aprovado: res === true, log: `Retornou ${res} (esperado true)` };
          } catch (e: any) {
            return { aprovado: false, log: e.message };
          }
        },
      },
      {
        nome: 'Bloqueia acesso sem requisitos suficientes',
        executar: (code) => {
          try {
            const func = new Function(`${code}; return podeEntrarSantuario(8, false, 40);`);
            const res = func();
            return { aprovado: res === false, log: `Retornou ${res} (esperado false)` };
          } catch (e: any) {
            return { aprovado: false, log: e.message };
          }
        },
      },
    ],
  },
  {
    id: 4,
    titulo: 'Fase 4: A Poção de Cura no DOM (Eventos)',
    dificuldade: 'medio',
    xp: 25,
    descricao:
      'Crie a lógica para manipular a poção de vida no DOM. Quando o botão "#btn-pocao" for clicado, adicione 25 pontos à vida (sem passar de 100) e atualize o texto de "#texto-hp".',
    objetivo:
      'Utilize document.querySelector, addEventListener("click"), Math.min() e atualize a propriedade textContent.',
    dica: 'Math.min(100, vida + 25) impede que a vida ultrapasse o limite máximo.',
    equivalenteBlocos: 'Bloco [quando este ator for clicado] ➔ [adicione (25) a {vida}]',
    equivalentePython: 'Equivale à reatividade de interface em frameworks web.',
    codigoInicial: `function configurarPocaoDeCura() {
  const botao = document.querySelector("#btn-pocao");
  const displayHp = document.querySelector("#texto-hp");
  let hpAtual = 50;

  botao.addEventListener("click", () => {
    // Cura de 25 pontos com teto de 100:
    hpAtual = Math.min(100, hpAtual + 25);
    displayHp.textContent = \`\${hpAtual} / 100 HP\`;
  });
}

configurarPocaoDeCura();`,
    testes: [
      {
        nome: 'Localiza elementos do DOM com querySelector',
        executar: (code) => {
          const temQuery = /document\.(querySelector|getElementById)/i.test(code);
          return {
            aprovado: temQuery,
            log: temQuery ? 'Seletores de DOM utilizados.' : 'Use document.querySelector("#btn-pocao").',
          };
        },
      },
      {
        nome: 'Adiciona ouvinte de evento click',
        executar: (code) => {
          const temEvent = /addEventListener\s*\(\s*['"]click['"]/i.test(code);
          return {
            aprovado: temEvent,
            log: temEvent ? 'addEventListener("click") configurado.' : 'Adicione o ouvinte click.',
          };
        },
      },
      {
        nome: 'Atualiza textContent com limite de 100 HP',
        executar: (code) => {
          const temText = /textContent/i.test(code);
          const temLimit = /Math\.min|if\s*\(.*100/i.test(code);
          return {
            aprovado: temText && temLimit,
            log: temText && temLimit ? 'Texto atualizado com controle de teto.' : 'Atualize textContent limitando a 100.',
          };
        },
      },
    ],
  },
  {
    id: 5,
    titulo: 'Fase 5: O Grimório Funcional (filter e map)',
    dificuldade: 'medio',
    xp: 30,
    descricao:
      'Dada uma lista de heróis, crie a função filtrarMagosPoderosos(aventureiros) que selecione apenas personagens da classe "Mago" e retorne um array apenas com seus nomes em maiúsculas.',
    objetivo:
      'Utilize .filter(h => h.classe === "Mago") e .map(h => h.nome.toUpperCase()).',
    dica: 'Você pode encadear os métodos diretamente: array.filter(...).map(...) de forma elegante.',
    equivalenteBlocos: 'Repetir para cada item, verificar SE classe for mago, adicionar à nova lista',
    equivalentePython: '[h["nome"].upper() for h in aventureiros if h["classe"] == "Mago"]',
    codigoInicial: `const aventureiros = [
  { nome: "Gandalf", classe: "Mago", poder: 95 },
  { nome: "Aragorn", classe: "Guerreiro", poder: 90 },
  { nome: "Raistlin", classe: "Mago", poder: 85 },
  { nome: "Legolas", classe: "Arqueiro", poder: 88 }
];

function filtrarMagosPoderosos(lista) {
  // TODO: Use .filter e .map:
  return lista
    .filter(h => h.classe === "Mago")
    .map(h => h.nome.toUpperCase());
}

console.log("Magos em maiúsculas:", filtrarMagosPoderosos(aventureiros));`,
    testes: [
      {
        nome: 'Retorna array com GANDALF e RAISTLIN',
        executar: (code) => {
          try {
            const func = new Function(`${code}; return filtrarMagosPoderosos(aventureiros);`);
            const res = func();
            const correto = Array.isArray(res) && res.length === 2 && res[0] === 'GANDALF' && res[1] === 'RAISTLIN';
            return {
              aprovado: correto,
              log: correto ? 'Array filtrado e transformado com sucesso.' : `Retornou: ${JSON.stringify(res)}`,
            };
          } catch (e: any) {
            return { aprovado: false, log: e.message };
          }
        },
      },
      {
        nome: 'Utiliza os métodos nativos .filter e .map',
        executar: (code) => {
          const temFilter = /\.filter\s*\(/i.test(code);
          const temMap = /\.map\s*\(/i.test(code);
          return {
            aprovado: temFilter && temMap,
            log: temFilter && temMap ? 'Métodos funcionais empregados.' : 'Utilize .filter() e .map().',
          };
        },
      },
    ],
  },
  {
    id: 6,
    titulo: 'Fase 6: O Tesouro da Guilda (reduce)',
    dificuldade: 'medio',
    xp: 30,
    descricao:
      'Calcule o saldo total de moedas de ouro de toda a guilda usando o método .reduce() acumulador em uma lista de membros.',
    objetivo:
      'Crie a função calcularTesouroTotal(membros) que acumule todas as propriedades ouro iniciando do valor zero.',
    dica: 'array.reduce((acumulador, item) => acumulador + item.ouro, 0) calcula a soma com valor inicial 0.',
    equivalenteBlocos: 'Definir {total} para 0 ➔ Repetir somando moedas de cada membro',
    equivalentePython: 'sum(m["ouro"] for m in membros)',
    codigoInicial: `const membrosGuilda = [
  { nome: "Arthur", ouro: 250 },
  { nome: "Merlin", ouro: 600 },
  { nome: "Guinevere", ouro: 450 }
];

function calcularTesouroTotal(membros) {
  // TODO: Use .reduce para somar o ouro de todos os membros:
  return membros.reduce((total, membro) => total + membro.ouro, 0);
}

console.log("Total no cofre:", calcularTesouroTotal(membrosGuilda)); // Esperado: 1300`,
    testes: [
      {
        nome: 'Retorna 1300 moedas para o grupo de teste',
        executar: (code) => {
          try {
            const func = new Function(`${code}; return calcularTesouroTotal(membrosGuilda);`);
            const res = func();
            return {
              aprovado: res === 1300,
              log: res === 1300 ? 'Soma total de 1300 moedas apurada.' : `Retornou: ${res} (esperado 1300)`,
            };
          } catch (e: any) {
            return { aprovado: false, log: e.message };
          }
        },
      },
      {
        nome: 'Utiliza o método .reduce() com acumulador',
        executar: (code) => {
          const temReduce = /\.reduce\s*\(/i.test(code);
          return {
            aprovado: temReduce,
            log: temReduce ? '.reduce() implementado.' : 'Utilize o método .reduce().',
          };
        },
      },
    ],
  },
  {
    id: 7,
    titulo: 'Fase 7: A Invocação Assíncrona (async / await)',
    dificuldade: 'dificil',
    xp: 35,
    descricao:
      'Implemente a função assíncrona consultarOraculoArcano(pergunta) que aguarde a resolução de uma Promise com await e retorne o pergaminho decifrado.',
    objetivo:
      'Declare a função com a palavra async e utilize await para receber os dados decodificados.',
    dica: 'Funções async sempre retornam Promises e permitem utilizar a palavra await antes de operações demoradas.',
    equivalenteBlocos: 'Bloco [espere até <resposta>] sem travar o restante do jogo',
    equivalentePython: 'async def consultar_oraculo(pergunta): await asyncio.sleep(...)',
    codigoInicial: `// Simulação de Oráculo na Nuvem
function buscarRespostaServidor(pergunta) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ resposta: "A vitória aguarda os corajosos!", poder: 99 });
    }, 100);
  });
}

// TODO: Complete com async e await:
async function consultarOraculoArcano(pergunta) {
  const resultado = await buscarRespostaServidor(pergunta);
  return resultado.resposta;
}

// Execução:
consultarOraculoArcano("Venceremos a batalha?").then(console.log);`,
    testes: [
      {
        nome: 'Declara função assíncrona com async e await',
        executar: (code) => {
          const temAsync = /async\s+function|const\s+\w+\s*=\s*async/i.test(code);
          const temAwait = /await\s+/i.test(code);
          return {
            aprovado: temAsync && temAwait,
            log: temAsync && temAwait ? 'Sintaxe async/await aplicada.' : 'Use as palavras-chave async e await.',
          };
        },
      },
      {
        nome: 'Retorna a mensagem decifrada',
        executar: (code) => {
          const temResposta = /resultado\.resposta|"A vitória aguarda/i.test(code);
          return {
            aprovado: temResposta,
            log: temResposta ? 'Retorno tratado corretamente.' : 'Retorne a propriedade resposta.',
          };
        },
      },
    ],
  },
  {
    id: 8,
    titulo: 'Fase 8: A Forja dos Campeões (Classes e POO)',
    dificuldade: 'dificil',
    xp: 40,
    descricao:
      'Modele a classe Campeao com constructor(nome, hp, ataque), método receberDano(dano) (que nunca deixa a vida menor que 0) e método estaVivo() que retorna booleano.',
    objetivo:
      'Utilize class, constructor, this, Math.max() para garantir vida >= 0 e retorne instâncias com new.',
    dica: 'Em classes JS, atributos de instância usam this: this.hp = Math.max(0, this.hp - dano).',
    equivalenteBlocos: 'Clones de atores com variáveis locais de saúde e poder',
    equivalentePython: 'class Campeao:\n    def __init__(self, nome, hp, ataque):\n        self.nome = nome',
    codigoInicial: `class Campeao {
  constructor(nome, hp = 100, ataque = 20) {
    this.nome = nome;
    this.hp = hp;
    this.ataque = ataque;
  }

  receberDano(dano) {
    this.hp = Math.max(0, this.hp - dano);
    return this.hp;
  }

  estaVivo() {
    return this.hp > 0;
  }
}

// Teste rápido:
const heroi = new Campeao("Geralt", 100, 45);
heroi.receberDano(40);
console.log(heroi.nome, "HP:", heroi.hp, "Vivo?", heroi.estaVivo());`,
    testes: [
      {
        nome: 'Instancia a classe e abate vida corretamente',
        executar: (code) => {
          try {
            const func = new Function(`
              ${code};
              const c = new Campeao("Teste", 100, 20);
              c.receberDano(40);
              return { hp: c.hp, vivo: c.estaVivo() };
            `);
            const res = func();
            return {
              aprovado: res.hp === 60 && res.vivo === true,
              log: res.hp === 60 ? 'Dano de 40 reduziu vida de 100 para 60.' : `HP: ${res.hp}`,
            };
          } catch (e: any) {
            return { aprovado: false, log: e.message };
          }
        },
      },
      {
        nome: 'Impede vida negativa e atualiza estaVivo para false',
        executar: (code) => {
          try {
            const func = new Function(`
              ${code};
              const c = new Campeao("Teste", 50, 20);
              c.receberDano(100);
              return { hp: c.hp, vivo: c.estaVivo() };
            `);
            const res = func();
            return {
              aprovado: res.hp === 0 && res.vivo === false,
              log: res.hp === 0 ? 'Vida estagnou em zero e estaVivo retornou false.' : `HP: ${res.hp}`,
            };
          } catch (e: any) {
            return { aprovado: false, log: e.message };
          }
        },
      },
    ],
  },
];

interface JavaScriptIDEProps {
  desafioInicialId?: number;
  onConcluirDesafio?: (id: number) => void;
}

export function JavaScriptIDE({ desafioInicialId = 1, onConcluirDesafio }: JavaScriptIDEProps) {
  const [desafioId, setDesafioId] = useState<number>(desafioInicialId);
  const desafio = DESAFIOS_JAVASCRIPT.find((d) => d.id === desafioId) || DESAFIOS_JAVASCRIPT[0];

  const [codigo, setCodigo] = useState(desafio.codigoInicial);
  const [logs, setLogs] = useState<string[]>([
    `>>> Ambiente Node/V8 carregado para ${desafio.titulo}...`,
    '>>> Pronto para interpretar o script.',
  ]);

  const [testesResultado, setTestesResultado] = useState<{ nome: string; aprovado: boolean; log: string }[]>([]);
  const [sucessoGeral, setSucessoGeral] = useState<boolean | null>(null);
  const [abaDireita, setAbaDireita] = useState<'console' | 'testes' | 'dom' | 'blocos'>('console');
  const [somAtivo, setSomAtivo] = useState(true);
  const [copiado, setCopiado] = useState(false);

  // Mini-DOM interativo
  const [domHp, setDomHp] = useState(50);

  // Efeitos Sonoros Web Audio API
  const tocarSom = (tipo: 'executar' | 'sucesso' | 'erro' | 'vitoria') => {
    if (!somAtivo || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const agora = ctx.currentTime;
      if (tipo === 'executar') {
        osc.frequency.setValueAtTime(400, agora);
        osc.frequency.exponentialRampToValueAtTime(800, agora + 0.1);
        gain.gain.setValueAtTime(0.1, agora);
        gain.gain.linearRampToValueAtTime(0.01, agora + 0.1);
        osc.start(agora);
        osc.stop(agora + 0.1);
      } else if (tipo === 'sucesso') {
        osc.frequency.setValueAtTime(523.25, agora);
        osc.frequency.setValueAtTime(659.25, agora + 0.08);
        osc.frequency.setValueAtTime(783.99, agora + 0.16);
        gain.gain.setValueAtTime(0.12, agora);
        gain.gain.linearRampToValueAtTime(0.01, agora + 0.25);
        osc.start(agora);
        osc.stop(agora + 0.25);
      } else if (tipo === 'erro') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, agora);
        osc.frequency.linearRampToValueAtTime(140, agora + 0.2);
        gain.gain.setValueAtTime(0.12, agora);
        gain.gain.linearRampToValueAtTime(0.01, agora + 0.2);
        osc.start(agora);
        osc.stop(agora + 0.2);
      } else if (tipo === 'vitoria') {
        const notas = [523.25, 659.25, 783.99, 1046.5];
        notas.forEach((freq, idx) => {
          const oscV = ctx.createOscillator();
          const gainV = ctx.createGain();
          oscV.connect(gainV);
          gainV.connect(ctx.destination);
          oscV.frequency.setValueAtTime(freq, agora + idx * 0.1);
          gainV.gain.setValueAtTime(0.15, agora + idx * 0.1);
          gainV.gain.linearRampToValueAtTime(0.01, agora + idx * 0.1 + 0.18);
          oscV.start(agora + idx * 0.1);
          oscV.stop(agora + idx * 0.1 + 0.18);
        });
      }
    } catch (e) {}
  };

  useEffect(() => {
    setCodigo(desafio.codigoInicial);
    setLogs([`>>> Carregando ${desafio.titulo}...`, '>>> Pronto para interpretar o script.']);
    setTestesResultado([]);
    setSucessoGeral(null);
  }, [desafioId, desafio.codigoInicial, desafio.titulo]);

  const executarCodigo = () => {
    tocarSom('executar');
    const logsCapturados: string[] = [];

    // Mock do console.log
    const originalLog = console.log;
    console.log = (...args: any[]) => {
      logsCapturados.push(args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
    };

    try {
      // Mock de DOM básico para desafio 4
      const mockBotao = {
        listener: null as any,
        addEventListener: function (evt: string, cb: any) {
          if (evt === 'click') this.listener = cb;
        },
        click: function () {
          if (this.listener) this.listener();
        },
      };

      const mockDisplayHp = { textContent: '50 / 100 HP' };

      const sandboxDocument = {
        querySelector: (sel: string) => {
          if (sel === '#btn-pocao') return mockBotao;
          if (sel === '#texto-hp') return mockDisplayHp;
          return null;
        },
        getElementById: (id: string) => {
          if (id === 'btn-pocao') return mockBotao;
          if (id === 'texto-hp') return mockDisplayHp;
          return null;
        },
      };

      // Executar código com mock document
      const executor = new Function('document', codigo);
      executor(sandboxDocument);

      // Se executou o mock do desafio 4, simula um clique para atualizar o mini-DOM
      if (desafio.id === 4 && mockBotao.listener) {
        mockBotao.click();
        const match = mockDisplayHp.textContent.match(/(\d+)/);
        if (match) setDomHp(Number(match[1]));
        logsCapturados.push(`[DOM Event] Botão #btn-pocao acionado! Novo texto: "${mockDisplayHp.textContent}"`);
      }

      if (logsCapturados.length === 0) {
        logsCapturados.push('>>> Código interpretado com sucesso (nenhuma saída no console).');
      }
    } catch (e: any) {
      logsCapturados.push(`❌ Erro de Execução: ${e.message}`);
    } finally {
      console.log = originalLog;
    }

    setLogs(logsCapturados);

    // Executar testes automatizados
    const resultados = desafio.testes.map((t) => {
      const res = t.executar(codigo);
      return { nome: t.nome, aprovado: res.aprovado, log: res.log };
    });

    setTestesResultado(resultados);
    const todosAprovados = resultados.every((r) => r.aprovado);
    setSucessoGeral(todosAprovados);

    if (todosAprovados) {
      tocarSom('vitoria');
      try {
        const salvas = localStorage.getItem('codequest_missoes_concluidas');
        const ids: number[] = salvas ? JSON.parse(salvas) : [];
        if (!ids.includes(desafio.id)) {
          ids.push(desafio.id);
          localStorage.setItem('codequest_missoes_concluidas', JSON.stringify(ids));
        }
      } catch (e) {}
      if (onConcluirDesafio) onConcluirDesafio(desafio.id);
    } else {
      tocarSom('erro');
    }
  };

  const restaurarCodigo = () => {
    setCodigo(desafio.codigoInicial);
  };

  const copiarCodigo = () => {
    navigator.clipboard.writeText(codigo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const inserirSnippet = (snippet: string) => {
    setCodigo((prev) => prev + '\n' + snippet);
  };

  return (
    <div className="space-y-4">
      {/* Seletor Superior de Fases */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {DESAFIOS_JAVASCRIPT.map((d) => {
          const selecionado = d.id === desafioId;
          return (
            <button
              key={d.id}
              onClick={() => setDesafioId(d.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold shrink-0 border transition flex items-center gap-2 ${
                selecionado
                  ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/30 font-black'
                  : 'bg-slate-900 border-quest-border text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Fase {d.id}</span>
              <span className="text-[10px] opacity-75">+{d.xp}XP</span>
            </button>
          );
        })}
      </div>

      {/* Card da IDE */}
      <Card className="border-quest-border bg-slate-900/90 shadow-2xl overflow-hidden">
        {/* Barra Superior da IDE */}
        <div className="p-4 bg-slate-950 border-b border-quest-border flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="warning">JavaScript ES2024</Badge>
              <Badge
                variant={
                  desafio.dificuldade === 'facil' ? 'success' : desafio.dificuldade === 'medio' ? 'warning' : 'danger'
                }
              >
                {desafio.dificuldade.toUpperCase()}
              </Badge>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> +{desafio.xp} XP
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">{desafio.titulo}</h3>
            <p className="text-xs text-slate-300">{desafio.descricao}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSomAtivo(!somAtivo)}
              className="text-xs text-slate-400 hover:text-white"
            >
              {somAtivo ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={restaurarCodigo}
              className="text-xs gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resetar</span>
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={executarCodigo}
              className="text-xs gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/30"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Executar Script</span>
            </Button>
          </div>
        </div>

        {/* Corpo Dividido: Editor vs Painel Direito */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-quest-border">
          {/* LADO ESQUERDO: EDITOR DE CÓDIGO */}
          <div className="flex flex-col bg-slate-950/60">
            <div className="p-2.5 bg-slate-950 border-b border-quest-border flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <Code2 className="w-4 h-4" />
                <span>script.js</span>
              </div>
              <Button size="sm" variant="ghost" onClick={copiarCodigo} className="text-xs p-1.5 text-slate-400">
                {copiado ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              </Button>
            </div>

            {/* Snippets Rápidos */}
            <div className="px-3 py-1.5 bg-slate-900/80 border-b border-quest-border flex items-center gap-1.5 overflow-x-auto text-[11px]">
              <span className="text-slate-400 font-bold shrink-0">Snippets:</span>
              <button
                onClick={() => inserirSnippet('console.log("Olá!");')}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono shrink-0 transition"
              >
                + console.log
              </button>
              <button
                onClick={() => inserirSnippet('const elemento = document.querySelector("#id");')}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono shrink-0 transition"
              >
                + querySelector
              </button>
              <button
                onClick={() => inserirSnippet('botao.addEventListener("click", () => {\n  // Ação\n});')}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono shrink-0 transition"
              >
                + addEventListener
              </button>
              <button
                onClick={() => inserirSnippet('const filtrados = itens.filter(i => i.ativo);')}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono shrink-0 transition"
              >
                + .filter
              </button>
            </div>

            {/* Editor de Código */}
            <div className="p-2 flex-1">
              <textarea
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                className="w-full h-[380px] bg-slate-950 text-amber-300 font-mono text-xs sm:text-sm p-4 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-400 resize-none leading-relaxed"
                spellCheck={false}
              />
            </div>
          </div>

          {/* LADO DIREITO: CONSOLE / TESTES / PALCO DOM / BLOCOS */}
          <div className="flex flex-col bg-slate-950/40">
            {/* Navegador de Abas */}
            <div className="p-2.5 bg-slate-950 border-b border-quest-border flex items-center gap-1.5 overflow-x-auto">
              <button
                onClick={() => setAbaDireita('console')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                  abaDireita === 'console'
                    ? 'bg-slate-800 text-white border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                <span>Console stdout</span>
              </button>
              <button
                onClick={() => setAbaDireita('testes')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                  abaDireita === 'testes'
                    ? 'bg-slate-800 text-white border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Testes ({desafio.testes.length})</span>
              </button>
              <button
                onClick={() => setAbaDireita('dom')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                  abaDireita === 'dom'
                    ? 'bg-slate-800 text-white border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MousePointerClick className="w-3.5 h-3.5 text-cyan-400" />
                <span>Palco DOM Vivo</span>
              </button>
              <button
                onClick={() => setAbaDireita('blocos')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                  abaDireita === 'blocos'
                    ? 'bg-slate-800 text-white border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>Blocos & Python</span>
              </button>
            </div>

            {/* Conteúdo da Aba Direita */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              {/* ABA 1: CONSOLE */}
              {abaDireita === 'console' && (
                <div className="space-y-2 flex-1 flex flex-col">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex-1 font-mono text-xs overflow-y-auto max-h-[360px] space-y-1">
                    {logs.map((log, idx) => (
                      <div
                        key={idx}
                        className={
                          log.startsWith('>>>')
                            ? 'text-slate-500'
                            : log.startsWith('❌')
                            ? 'text-rose-400 font-bold'
                            : log.startsWith('[DOM')
                            ? 'text-cyan-400 font-bold'
                            : 'text-amber-300 font-medium'
                        }
                      >
                        {log}
                      </div>
                    ))}
                  </div>

                  {sucessoGeral === true && (
                    <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/60 flex items-center justify-between text-xs text-emerald-300 font-bold">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Desafio {desafio.id} Concluído! (+{desafio.xp} XP)
                      </span>
                      {desafioId < DESAFIOS_JAVASCRIPT.length && (
                        <button
                          onClick={() => setDesafioId((prev) => prev + 1)}
                          className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs transition"
                        >
                          Próxima Fase ➔
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ABA 2: SUÍTE DE TESTES */}
              {abaDireita === 'testes' && (
                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-300 flex items-center justify-between border-b border-slate-800 pb-2">
                      <span>Validação Unitária de Requisitos</span>
                      {sucessoGeral === true && (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Aprovado!
                        </span>
                      )}
                      {sucessoGeral === false && (
                        <span className="text-rose-400 font-bold flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Revise o Código
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      {desafio.testes.map((teste, idx) => {
                        const res = testesResultado.find((t) => t.nome === teste.nome);
                        return (
                          <div
                            key={idx}
                            className={`p-3 rounded-xl border text-xs flex items-center justify-between transition ${
                              res === undefined
                                ? 'bg-slate-950/70 border-slate-800 text-slate-400'
                                : res.aprovado
                                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                                : 'bg-rose-950/40 border-rose-500 text-rose-300'
                            }`}
                          >
                            <div>
                              <div className="font-semibold">{teste.nome}</div>
                              {res && <div className="text-[11px] opacity-80 mt-0.5">{res.log}</div>}
                            </div>
                            {res === undefined ? (
                              <span className="text-[10px] text-slate-500">Pendente</span>
                            ) : res.aprovado ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="primary"
                    onClick={executarCodigo}
                    className="w-full text-xs gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                  >
                    <span>Rodar Testes Novamente</span>
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </Button>
                </div>
              )}

              {/* ABA 3: PALCO DOM VIVO */}
              {abaDireita === 'dom' && (
                <div className="space-y-4 flex-1 flex flex-col justify-center items-center">
                  <div className="w-full max-w-sm p-5 rounded-2xl bg-slate-900 border-2 border-amber-500/60 shadow-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-bold text-amber-300">Elemento Vivo no DOM</span>
                      <span className="text-[10px] font-mono text-slate-400">#painel-jogo</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-300 font-semibold">
                        <span>Vida do Herói (<span id="texto-hp">{domHp} / 100 HP</span>):</span>
                        <span className="text-emerald-400">{domHp}%</span>
                      </div>
                      <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${domHp}%` }}
                        />
                      </div>
                    </div>

                    <button
                      id="btn-pocao"
                      onClick={() => {
                        setDomHp((h) => Math.min(100, h + 25));
                        setLogs((prev) => [
                          ...prev,
                          `[DOM Click Direto] Vida curada para ${Math.min(100, domHp + 25)} / 100 HP`,
                        ]);
                      }}
                      className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                    >
                      <span>🧪 Beber Poção (#btn-pocao)</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center max-w-xs">
                    Este palco reage em tempo real aos métodos de seleção e alteração do DOM executados pelo seu script!
                  </p>
                </div>
              )}

              {/* ABA 4: BLOCOS & PYTHON */}
              {abaDireita === 'blocos' && (
                <div className="space-y-3 flex-1 flex flex-col justify-center text-xs">
                  <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-900/60 space-y-1">
                    <span className="font-bold text-indigo-300 block">🧩 Equivalente em Blocos:</span>
                    <pre className="text-slate-300 font-mono whitespace-pre-wrap">{desafio.equivalenteBlocos}</pre>
                  </div>

                  <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-900/60 space-y-1">
                    <span className="font-bold text-cyan-300 block">🐍 Equivalente em Python:</span>
                    <pre className="text-slate-300 font-mono whitespace-pre-wrap">{desafio.equivalentePython}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

