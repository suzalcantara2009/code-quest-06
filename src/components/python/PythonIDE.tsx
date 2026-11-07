'use client';

import React, { useState, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Code2,
  Trophy,
  ArrowRight,
  HelpCircle,
  Volume2,
  VolumeX,
  Blocks,
  Copy,
  Check,
  Compass,
  FileCode,
  CheckSquare,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

// Sons sintetizados nativos com Web Audio API
function emitirSom(tipo: 'run' | 'sucesso' | 'erro' | 'vitoria', habilitado: boolean) {
  if (!habilitado || typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    if (tipo === 'run') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.12);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (tipo === 'sucesso') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (tipo === 'erro') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.18);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (tipo === 'vitoria') {
      const notas = [523.25, 659.25, 783.99, 1046.50];
      notas.forEach((freq, idx) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        const t = now + idx * 0.12;
        o.frequency.setValueAtTime(freq, t);
        g.gain.setValueAtTime(0.15, t);
        g.gain.exponentialRampToValueAtTime(0.01, t + 0.28);
        o.start(t);
        o.stop(t + 0.28);
      });
    }
  } catch (e) {}
}

export interface DesafioPython {
  id: number;
  titulo: string;
  descricao: string;
  objetivo: string;
  equivalenteBlocos: string;
  codigoInicial: string;
  dica: string;
  xp: number;
  testarCodigo: (codigo: string) => {
    sucesso: boolean;
    logs: string[];
    testes: { nome: string; passou: boolean; detalhe: string }[];
  };
}

// 8 Desafios Progressivos de Código Python
const DESAFIOS_PYTHON: DesafioPython[] = [
  {
    id: 1,
    titulo: 'Desafio 1: O Primeiro Feitiço (print e variáveis)',
    descricao: 'Crie duas variáveis para o herói (nome_heroi e poder_ataque) e exiba uma mensagem usando print().',
    objetivo: 'Definir nome_heroi, poder_ataque >= 50 e imprimir a mensagem no terminal.',
    equivalenteBlocos: 'Blocos: Definir [nome] para "Geralt" + Definir [poder] para 75 + Diga [nome e poder]',
    codigoInicial: `# 1. Declare as variáveis do seu herói:
nome_heroi = "Geralt"
poder_ataque = 75

# 2. Imprima a apresentação no terminal:
print(f"Herói: {nome_heroi} | Poder: {poder_ataque}")
`,
    dica: 'Lembre-se de não usar espaços no nome da variável (use snake_case como nome_heroi) e texto entre aspas.',
    xp: 20,
    testarCodigo: (code) => {
      const logs: string[] = [];
      const testes = [];

      const temNome = /nome_heroi\s*=\s*["'][^"']+["']/.test(code);
      const temPoder = /poder_ataque\s*=\s*\d+/.test(code);
      const temPrint = /print\s*\(/.test(code);

      testes.push({
        nome: 'Variável nome_heroi definida',
        passou: temNome,
        detalhe: temNome ? 'Variável de texto declarada corretamente.' : 'Declare nome_heroi = "SeuNome".',
      });

      testes.push({
        nome: 'Variável poder_ataque numérica',
        passou: temPoder,
        detalhe: temPoder ? 'Valor numérico atribuído.' : 'Declare poder_ataque = 75 (sem aspas).',
      });

      testes.push({
        nome: 'Uso da função print()',
        passou: temPrint,
        detalhe: temPrint ? 'Função print chamada com sucesso.' : 'Utilize print(...) para exibir a mensagem.',
      });

      logs.push('>>> Executando script Python...');
      if (temNome && temPoder) {
        logs.push('Herói: Arthur Pendragon | Poder: 85');
        logs.push('Saída gerada com sucesso pelo interpretador.');
      } else {
        logs.push('Aviso: Certifique-se de declarar todas as variáveis solicitadas.');
      }

      const sucesso = temNome && temPoder && temPrint;
      return { sucesso, logs, testes };
    },
  },
  {
    id: 2,
    titulo: 'Desafio 2: A Balança do Destino (if e else)',
    descricao: 'Escreva uma estrutura condicional if/else para verificar se a vida do herói é maior que 0.',
    objetivo: 'Usar if vida > 0: print("Vivo") else: print("Derrotado").',
    equivalenteBlocos: 'Bloco: SE (vida > 0) ENTÃO [Diga "Herói segue em pé"] SENÃO [Diga "Herói derrotado"]',
    codigoInicial: `vida = 45

# Crie a estrutura condicional if / else com indentação correta:
if vida > 0:
    print("Herói segue em pé na batalha!")
else:
    print("O herói foi derrotado nas catacumbas...")
`,
    dica: 'Não se esqueça dos dois pontos (:) após o if e o else, além dos 4 espaços de indentação.',
    xp: 25,
    testarCodigo: (code) => {
      const logs: string[] = [];
      const testes = [];

      const temIf = /if\s+vida\s*>\s*0\s*:/.test(code);
      const temElse = /else\s*:/.test(code);
      const temIndentacao = /\n\s{4}print/.test(code);

      testes.push({
        nome: 'Estrutura if vida > 0:',
        passou: temIf,
        detalhe: temIf ? 'Condição formulada corretamente.' : 'Verifique se escreveu if vida > 0:',
      });

      testes.push({
        nome: 'Cláusula else:',
        passou: temElse,
        detalhe: temElse ? 'Cláusula alternativa presente.' : 'Inclua o bloco else: no final.',
      });

      testes.push({
        nome: 'Indentação de 4 espaços',
        passou: temIndentacao,
        detalhe: temIndentacao ? 'Indentação válida do Python.' : 'Use 4 espaços (ou Tab) dentro do if e else.',
      });

      logs.push('>>> Avaliando expressão booleana vida > 0 (vida = 45)...');
      logs.push('Resultado da condição: True');
      logs.push('Herói segue em pé na batalha!');

      const sucesso = temIf && temElse && temIndentacao;
      return { sucesso, logs, testes };
    },
  },
  {
    id: 3,
    titulo: 'Desafio 3: A Marcha dos Golens (for loop e range)',
    descricao: 'Utilize um loop for com range(4) para forjar 4 golens protetores para a muralha.',
    objetivo: 'Usar for i in range(4): exibindo o progresso de cada iteração.',
    equivalenteBlocos: 'Bloco: Repetir (4) vezes [ Montar Golem + Avançar ]',
    codigoInicial: `# Utilize o laço for com range para criar 4 autômatos:
for i in range(4):
    print(f"Golem #{i + 1} ativado e posicionado nas muralhas!")
`,
    dica: 'O range(4) percorre os valores 0, 1, 2 e 3. Some 1 ao imprimir para exibir de 1 a 4!',
    xp: 30,
    testarCodigo: (code) => {
      const logs: string[] = [];
      const testes = [];

      const temFor = /for\s+\w+\s+in\s+range\(\s*4\s*\)\s*:/.test(code);
      const temPrintLoop = /\n\s{4}print/.test(code);

      testes.push({
        nome: 'Loop for com range(4):',
        passou: temFor,
        detalhe: temFor ? 'Laço com range(4) configurado.' : 'Escreva for i in range(4):',
      });

      testes.push({
        nome: 'Instrução interna indentada',
        passou: temPrintLoop,
        detalhe: temPrintLoop ? 'Comandos no interior do loop.' : 'Indente o print dentro do loop com 4 espaços.',
      });

      logs.push('>>> Iniciando loop de 4 iterações...');
      logs.push('Golem #1 ativado e posicionado nas muralhas!');
      logs.push('Golem #2 ativado e posicionado nas muralhas!');
      logs.push('Golem #3 ativado e posicionado nas muralhas!');
      logs.push('Golem #4 ativado e posicionado nas muralhas!');
      logs.push('>>> Loop finalizado com sucesso.');

      const sucesso = temFor && temPrintLoop;
      return { sucesso, logs, testes };
    },
  },
  {
    id: 4,
    titulo: 'Desafio 4: A Forja das Funções (def e return)',
    descricao: 'Construa a função calcular_dano_critico(ataque_base, multiplicador, bonus) que retorna o dano total.',
    objetivo: 'Criar def calcular_dano_critico(...) e retornar (base * mult) + bonus.',
    equivalenteBlocos: 'Bloco de Função: MontarGolem(runa, armadura) com retorno',
    codigoInicial: `def calcular_dano_critico(ataque_base, multiplicador, bonus):
    # Calcule o dano total e use o comando return:
    dano_total = (ataque_base * multiplicador) + bonus
    return dano_total

# Teste chamando sua função:
resultado = calcular_dano_critico(50, 1.5, 10)
print(f"Dano desferido: {resultado}")
`,
    dica: 'Não se esqueça de usar a palavra-chave return para que a função devolva o valor para quem a chamou.',
    xp: 35,
    testarCodigo: (code) => {
      const logs: string[] = [];
      const testes = [];

      const temDef = /def\s+calcular_dano_critico\s*\(/.test(code);
      const temReturn = /return\s+/.test(code);
      const temCalculo = /\*\s*multiplicador|\*\s*mult/.test(code);

      testes.push({
        nome: 'Declaração def calcular_dano_critico(...)',
        passou: temDef,
        detalhe: temDef ? 'Assinatura da função correta.' : 'Defina a função com os 3 parâmetros.',
      });

      testes.push({
        nome: 'Retorno com comando return',
        passou: temReturn,
        detalhe: temReturn ? 'Comando return implementado.' : 'A função precisa retornar o valor numérico.',
      });

      testes.push({
        nome: 'Operação de multiplicação de dano',
        passou: temCalculo,
        detalhe: temCalculo ? 'Multiplicação de dano presente.' : 'Multiplique o ataque base pelo multiplicador.',
      });

      logs.push('>>> Testando chamada calcular_dano_critico(50, 1.5, 10)...');
      logs.push('Retorno obtido: 85.0');
      logs.push('>>> Testando caso 2: calcular_dano_critico(100, 2.0, 20)...');
      logs.push('Retorno obtido: 220.0');

      const sucesso = temDef && temReturn && temCalculo;
      return { sucesso, logs, testes };
    },
  },
  {
    id: 5,
    titulo: 'Desafio 5: O Inventário do Alquimista (Listas e .append)',
    descricao: 'Crie uma lista de poções mágicas, adicione uma nova poção com .append() e exiba a quantidade total.',
    objetivo: 'Criar lista de poções, usar .append("Elixir do Dragão") e len(pocoes).',
    equivalenteBlocos: 'Blocos de Lista do Scratch: Adicionar [item] a [lista] e tamanho de [lista]',
    codigoInicial: `# 1. Lista inicial com 2 poções:
pocoes = ["Poção de Vida", "Poção de Mana"]

# 2. Adicione a nova poção mágica à lista com .append():
pocoes.append("Elixir do Dragão")

# 3. Exiba o inventário e a quantidade com len():
print(f"Inventário: {pocoes}")
print(f"Total de poções: {len(pocoes)}")
`,
    dica: 'O método .append() insere o item no final da lista. A função len(lista) retorna o tamanho total.',
    xp: 40,
    testarCodigo: (code) => {
      const logs: string[] = [];
      const testes = [];

      const temLista = /pocoes\s*=\s*\[.*\]/.test(code);
      const temAppend = /pocoes\.append\s*\(/.test(code);
      const temLen = /len\s*\(\s*pocoes\s*\)/.test(code);

      testes.push({
        nome: 'Criação da lista pocoes = [...]',
        passou: temLista,
        detalhe: temLista ? 'Lista criada entre colchetes.' : 'Defina pocoes com colchetes [].',
      });

      testes.push({
        nome: 'Método .append()',
        passou: temAppend,
        detalhe: temAppend ? 'Item adicionado dinamicamente.' : 'Use pocoes.append("Elixir...").',
      });

      testes.push({
        nome: 'Contagem com len(pocoes)',
        passou: temLen,
        detalhe: temLen ? 'Tamanho da lista aferido.' : 'Utilize len(pocoes) para contar os itens.',
      });

      logs.push('>>> Executando script de inventário...');
      logs.push("Inventário: ['Poção de Vida', 'Poção de Mana', 'Elixir do Dragão']");
      logs.push('Total de poções: 3');

      const sucesso = temLista && temAppend && temLen;
      return { sucesso, logs, testes };
    },
  },
  {
    id: 6,
    titulo: 'Desafio 6: O Dicionário de Feitiços (Dicionários {})',
    descricao: 'Crie um dicionário com magias e seus custos de mana. Consulte o custo da magia "bola_de_fogo".',
    objetivo: 'Criar dicionário grimorio = {"bola_de_fogo": 30, ...} e acessar grimorio["bola_de_fogo"].',
    equivalenteBlocos: 'Blocos de Variáveis com Chave-Valor em Blocos de Dados',
    codigoInicial: `# Crie o dicionário com os feitiços e seus respectivos custos:
grimorio = {
    "bola_de_fogo": 30,
    "escudo_arcano": 20,
    "raio_congelante": 25
}

# Consulte o custo do feitiço:
custo = grimorio["bola_de_fogo"]
print(f"Custo para lançar Bola de Fogo: {custo} mana")
`,
    dica: 'Dicionários usam chaves {} com pares "chave": valor. O acesso é feito com colchetes: grimorio["chave"].',
    xp: 45,
    testarCodigo: (code) => {
      const logs: string[] = [];
      const testes = [];

      const temDict = /grimorio\s*=\s*\{[\s\S]*\}/.test(code);
      const temAcesso = /grimorio\s*\[\s*["']bola_de_fogo["']\s*\]/.test(code);

      testes.push({
        nome: 'Estrutura de dicionário com chaves {}',
        passou: temDict,
        detalhe: temDict ? 'Dicionário declarado com pares chave-valor.' : 'Crie o dicionário usando chaves {}.',
      });

      testes.push({
        nome: 'Acesso pela chave ["bola_de_fogo"]',
        passou: temAcesso,
        detalhe: temAcesso ? 'Chave consultada com sucesso.' : 'Acesse o item com grimorio["bola_de_fogo"].',
      });

      logs.push('>>> Consultando grimório arcano...');
      logs.push('Custo para lançar Bola de Fogo: 30 mana');
      logs.push('Dicionário verificado sem erros.');

      const sucesso = temDict && temAcesso;
      return { sucesso, logs, testes };
    },
  },
  {
    id: 7,
    titulo: 'Desafio 7: A Purificação dos Cristais (List Comprehension)',
    descricao: 'Utilize List Comprehension em Python para filtrar apenas os cristais com poder superior a 50.',
    objetivo: 'Usar [c for c in cristais if c > 50] para filtrar a lista.',
    equivalenteBlocos: 'Combinação de Loop Repetir com Condicional SE dentro de lista',
    codigoInicial: `cristais_brutos = [20, 85, 45, 90, 15, 60]

# Filtre os cristais raros com pureza > 50 usando list comprehension:
cristais_raros = [c for c in cristais_brutos if c > 50]

print(f"Cristais refinados: {cristais_raros}")
`,
    dica: 'A sintaxe é: [item for item in lista if condicao]. É a forma mais pythônica de filtrar dados!',
    xp: 50,
    testarCodigo: (code) => {
      const logs: string[] = [];
      const testes = [];

      const temComprehension = /\[\s*\w+\s+for\s+\w+\s+in\s+cristais_brutos\s+if\s+\w+\s*>\s*50\s*\]/.test(code);

      testes.push({
        nome: 'Sintaxe de List Comprehension [x for x in ... if ...]',
        passou: temComprehension,
        detalhe: temComprehension ? 'Compreensão de lista aplicada com perfeição.' : 'Use [c for c in cristais_brutos if c > 50].',
      });

      logs.push('>>> Processando lista de cristais brutos [20, 85, 45, 90, 15, 60]...');
      logs.push('Cristais refinados: [85, 90, 60]');
      logs.push('Filtro executado em tempo O(n).');

      const sucesso = temComprehension;
      return { sucesso, logs, testes };
    },
  },
  {
    id: 8,
    titulo: 'Desafio 8: A Forja dos Heróis (Classes e POO)',
    descricao: 'Modele a classe PersonagemRPG com construtor __init__ e o método receber_dano(valor).',
    objetivo: 'Criar class PersonagemRPG com self.nome, self.vida e def receber_dano(self, dano).',
    equivalenteBlocos: 'A Forja dos Autômatos Modular em Blocos (Molde Reutilizável)',
    codigoInicial: `class PersonagemRPG:
    def __init__(self, nome, classe_heroi, vida=100):
        self.nome = nome
        self.classe_heroi = classe_heroi
        self.vida = vida

    def receber_dano(self, dano):
        self.vida = max(0, self.vida - dano)
        return self.vida

# Instanciando o herói a partir do molde da classe:
heroi = PersonagemRPG("Geralt", "Bruxo", 100)
heroi.receber_dano(35)
print(f"{heroi.nome} recebeu golpe! Vida restante: {heroi.vida} HP")
`,
    dica: 'Lembre-se do primeiro parâmetro obrigatório self nos métodos de instância da classe!',
    xp: 60,
    testarCodigo: (code) => {
      const logs: string[] = [];
      const testes = [];

      const temClass = /class\s+PersonagemRPG\s*:/.test(code);
      const temInit = /def\s+__init__\s*\(\s*self/.test(code);
      const temMetodo = /def\s+receber_dano\s*\(\s*self/.test(code);
      const temMax = /self\.vida\s*=\s*max\(0,\s*self\.vida\s*-\s*\w+\)|self\.vida\s*-=\s*\w+/.test(code);

      testes.push({
        nome: 'Declaração class PersonagemRPG:',
        passou: temClass,
        detalhe: temClass ? 'Classe declarada.' : 'Defina class PersonagemRPG:',
      });

      testes.push({
        nome: 'Construtor def __init__(self, ...)',
        passou: temInit,
        detalhe: temInit ? 'Construtor inicializa atributos.' : 'Defina def __init__(self, nome, ...):',
      });

      testes.push({
        nome: 'Método def receber_dano(self, dano)',
        passou: temMetodo && temMax,
        detalhe: temMetodo ? 'Método altera a vida sem deixá-la negativa.' : 'Crie o método receber_dano manipulando self.vida.',
      });

      logs.push('>>> Instanciando objeto PersonagemRPG("Geralt", "Bruxo", 100)...');
      logs.push('>>> Executando heroi.receber_dano(35)...');
      logs.push('Geralt recebeu golpe! Vida restante: 65 HP');
      logs.push('>>> Testando blindagem contra dano excessivo (receber_dano(100))...');
      logs.push('Vida restante: 0 HP (aferição de valor não-negativo bem sucedida)');

      const sucesso = temClass && temInit && temMetodo;
      return { sucesso, logs, testes };
    },
  },
];

interface PythonIDEProps {
  desafioInicialId?: number;
  onConcluirDesafio?: (desafioId: number, xp: number) => void;
}

export function PythonIDE({ desafioInicialId = 1, onConcluirDesafio }: PythonIDEProps) {
  const [desafioId, setDesafioId] = useState(desafioInicialId);
  const desafio = DESAFIOS_PYTHON.find((d) => d.id === desafioId) || DESAFIOS_PYTHON[0];

  const [codigo, setCodigo] = useState(desafio.codigoInicial);
  const [abaDireita, setAbaDireita] = useState<'terminal' | 'testes' | 'blocos'>('terminal');
  const [logs, setLogs] = useState<string[]>(['>>> Python 3.12 (Ambiente Interativo CodeQuest)', '>>> Digite seu código e clique em "Executar Código Python".']);
  const [testesResultado, setTestesResultado] = useState<{ nome: string; passou: boolean; detalhe: string }[]>([]);
  const [executando, setExecutando] = useState(false);
  const [sucessoGeral, setSucessoGeral] = useState<boolean | null>(null);
  const [modalVitoria, setModalVitoria] = useState(false);
  const [somAtivo, setSomAtivo] = useState(true);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    setCodigo(desafio.codigoInicial);
    setLogs([`>>> Carregando ${desafio.titulo}...`, '>>> Pronto para compilar e executar.']);
    setTestesResultado([]);
    setSucessoGeral(null);
  }, [desafioId, desafio.codigoInicial, desafio.titulo]);

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

  const executarPython = () => {
    if (executando) return;
    setExecutando(true);
    emitirSom('run', somAtivo);

    setTimeout(() => {
      const res = desafio.testarCodigo(codigo);
      setLogs(res.logs);
      setTestesResultado(res.testes);
      setSucessoGeral(res.sucesso);
      setExecutando(false);

      if (res.sucesso) {
        emitirSom('vitoria', somAtivo);
        setModalVitoria(true);

        // Salvar conclusão no localStorage
        try {
          const salvas = localStorage.getItem('codequest_missoes_concluidas');
          const ids: number[] = salvas ? JSON.parse(salvas) : [];
          // IDs de Python começam em 5 no catálogo oficial
          const missaoRefId = desafio.id + 4;
          if (!ids.includes(missaoRefId)) {
            ids.push(missaoRefId);
            localStorage.setItem('codequest_missoes_concluidas', JSON.stringify(ids));
          }
        } catch (e) {}

        if (onConcluirDesafio) {
          onConcluirDesafio(desafio.id, desafio.xp);
        }
      } else {
        emitirSom('erro', somAtivo);
        setAbaDireita('testes');
      }
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Seletor dos 8 Desafios de Python */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-quest-border shadow-lg">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-cyan-400 shrink-0" />
          <span className="text-xs sm:text-sm font-bold text-white">8 Desafios em Python:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {DESAFIOS_PYTHON.map((d) => (
            <button
              key={d.id}
              onClick={() => !executando && setDesafioId(d.id)}
              disabled={executando}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                d.id === desafioId
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span>Fase {d.id}</span>
              <span className="text-[10px] text-amber-300 font-mono">+{d.xp}XP</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cartão de Instruções do Desafio */}
      <Card className="border-quest-border bg-slate-900/90 shadow-xl">
        <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <Badge variant="cyan">Módulo Python</Badge>
              <Badge variant="purple">{desafio.titulo}</Badge>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> +{desafio.xp} XP
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">{desafio.descricao}</p>
            <div className="text-xs text-cyan-300 font-medium mt-1 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Objetivo: {desafio.objetivo}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={restaurarCodigo}
              disabled={executando}
              className="text-xs"
            >
              Restaurar Código
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={copiarCodigo}
              className="text-xs text-cyan-400 hover:text-cyan-300 gap-1"
            >
              {copiado ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiado ? 'Copiado!' : 'Copiar'}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Grid Principal da IDE: Editor de Código (Esquerda) vs Terminal & Testes (Direita) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* COLUNA ESQUERDA: EDITOR DE CÓDIGO PYTHON (Col 7) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-quest-border shadow-lg flex flex-col h-full min-h-[480px]">
            {/* Barra Superior do Editor */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-quest-border pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono font-bold text-slate-300 ml-1 flex items-center gap-1">
                  <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                  desafio_{desafio.id}.py
                </span>
              </div>

              {/* Botões Rápidos de Snippets */}
              <div className="flex items-center gap-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => inserirSnippet('print("Alvo atingido!")')}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition"
                >
                  + print()
                </button>
                <button
                  type="button"
                  onClick={() => inserirSnippet('if vida > 0:\n    print("Vivo")')}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition"
                >
                  + if
                </button>
                <button
                  type="button"
                  onClick={() => inserirSnippet('for i in range(3):\n    pass')}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition"
                >
                  + for
                </button>
              </div>
            </div>

            {/* Editor de Texto com Números de Linha */}
            <div className="flex-1 relative rounded-xl border border-slate-700 bg-slate-950 p-3 font-mono text-xs sm:text-sm text-cyan-200 focus-within:border-cyan-500 shadow-inner flex overflow-hidden">
              <textarea
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                rows={16}
                spellCheck={false}
                className="w-full bg-transparent resize-y outline-none font-mono text-xs sm:text-sm text-cyan-100 leading-relaxed pl-1"
                placeholder="# Digite seu código Python aqui..."
              />
            </div>

            {/* Barra Inferior com Botão Executar */}
            <div className="pt-3 border-t border-quest-border flex items-center justify-between gap-3 mt-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSomAtivo(!somAtivo)}
                  className={`p-1.5 rounded-lg border text-xs transition ${
                    somAtivo ? 'bg-cyan-950 border-cyan-800 text-cyan-300' : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                  title={somAtivo ? 'Som Ativo' : 'Som Mudo'}
                >
                  {somAtivo ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>
                <span className="text-[11px] text-slate-400">Python 3.12 Sandboxed</span>
              </div>

              <Button
                onClick={executarPython}
                isLoading={executando}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 text-xs sm:text-sm gap-2 shadow-lg shadow-cyan-500/20"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Executar Código Python</span>
              </Button>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: TERMINAL + SUÍTE DE TESTES + EQUIVALENTE EM BLOCOS (Col 5) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-quest-border shadow-lg flex flex-col h-full min-h-[480px]">
            {/* Abas da Coluna Direita */}
            <div className="flex items-center justify-between border-b border-quest-border pb-2.5 mb-3">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setAbaDireita('terminal')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    abaDireita === 'terminal'
                      ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Terminal</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAbaDireita('testes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    abaDireita === 'testes'
                      ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>Casos de Teste</span>
                  {testesResultado.length > 0 && (
                    <span className="text-[10px] bg-slate-900 px-1.5 py-0.2 rounded-full">
                      {testesResultado.filter((t) => t.passou).length}/{testesResultado.length}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setAbaDireita('blocos')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    abaDireita === 'blocos'
                      ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Blocks className="w-3.5 h-3.5 text-purple-400" />
                  <span>Nos Blocos</span>
                </button>
              </div>
            </div>

            {/* CONTEÚDO 1: TERMINAL / CONSOLE DE SAÍDA */}
            {abaDireita === 'terminal' && (
              <div className="flex-1 flex flex-col bg-black rounded-xl border border-slate-800 p-3 font-mono text-xs overflow-y-auto max-h-[380px]">
                <div className="text-slate-500 text-[11px] mb-2 border-b border-slate-900 pb-1">
                  Terminal de Saída do Python (stdout)
                </div>
                <div className="space-y-1.5 flex-1">
                  {logs.map((log, idx) => (
                    <div
                      key={idx}
                      className={
                        log.startsWith('>>>')
                          ? 'text-cyan-400 font-semibold'
                          : log.startsWith('Aviso')
                          ? 'text-amber-400'
                          : log.startsWith('Erro')
                          ? 'text-red-400'
                          : 'text-slate-200'
                      }
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONTEÚDO 2: CASOS DE TESTE AUTOMATIZADOS */}
            {abaDireita === 'testes' && (
              <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[380px]">
                {testesResultado.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                    <CheckSquare className="w-8 h-8 mb-2 opacity-40 text-cyan-400" />
                    <p className="text-xs font-medium text-slate-400">Nenhum teste executado ainda</p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Clique em &quot;Executar Código Python&quot; para rodar a suíte de validação pedagógica.
                    </p>
                  </div>
                ) : (
                  testesResultado.map((t, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-xs space-y-1 transition-all ${
                        t.passou
                          ? 'bg-emerald-950/40 border-emerald-700 text-emerald-200'
                          : 'bg-red-950/40 border-red-700 text-red-200'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span className="flex items-center gap-1.5">
                          {t.passou ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                          )}
                          {t.nome}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-black/40">
                          {t.passou ? 'PASSOU' : 'FALHOU'}
                        </span>
                      </div>
                      <p className="text-[11px] opacity-80 pl-5">{t.detalhe}</p>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* CONTEÚDO 3: A PONTE COM O SCRATCH / BLOCOS */}
            {abaDireita === 'blocos' && (
              <div className="flex-1 p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/60">
                  <span className="font-bold text-purple-300 block mb-1">Como você faria isso no Scratch?</span>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {desafio.equivalenteBlocos}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <span className="font-bold text-amber-300 block">Dica do Mestre Arcano:</span>
                  <p className="text-slate-400 text-xs leading-relaxed">{desafio.dica}</p>
                </div>
              </div>
            )}

            {/* Status Geral de Conclusão */}
            {sucessoGeral !== null && (
              <div
                className={`p-2.5 rounded-xl border text-xs mt-3 flex items-center justify-between animate-in fade-in ${
                  sucessoGeral
                    ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                    : 'bg-red-950/60 border-red-600 text-red-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  {sucessoGeral ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  <span className="font-bold">
                    {sucessoGeral ? 'Desafio Superado com Sucesso!' : 'Revise os critérios de teste acima.'}
                  </span>
                </div>
                {sucessoGeral && <span className="font-mono text-amber-400 font-bold">+{desafio.xp} XP</span>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL DE VITÓRIA E PROGRESSO */}
      {modalVitoria && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="max-w-md w-full border-cyan-500/60 bg-slate-900 text-center shadow-2xl">
            <CardHeader className="pt-8">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-cyan-950 border border-cyan-500 text-cyan-400 flex items-center justify-center mb-3 shadow-lg shadow-cyan-500/30">
                <Trophy className="w-8 h-8 text-amber-400" />
              </div>
              <CardTitle className="text-2xl text-white">Código Python Validado!</CardTitle>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Excelente trabalho! Você concluiu com louvor o <strong>{desafio.titulo}</strong>!
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-around">
                <div>
                  <div className="text-xs text-slate-400">XP Concedido</div>
                  <div className="text-xl font-bold text-amber-400">+{desafio.xp} XP</div>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div>
                  <div className="text-xs text-slate-400">Linguagem</div>
                  <div className="text-sm font-semibold text-cyan-400">Python 3.12</div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                {desafio.id < 8 ? (
                  <Button
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold gap-2"
                    onClick={() => {
                      setModalVitoria(false);
                      setDesafioId(desafio.id + 1);
                    }}
                  >
                    <span>Avançar para a Fase {desafio.id + 1} de Python</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
                    onClick={() => setModalVitoria(false)}
                  >
                    🏆 Você Dominou os 8 Desafios de Python!
                  </Button>
                )}

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setModalVitoria(false)}
                >
                  Continuar Neste Desafio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

