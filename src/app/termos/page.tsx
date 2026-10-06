import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function TermosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Termos de Uso e Política de Privacidade</CardTitle>
          <p className="text-sm text-slate-400">Versão 1.0 — Em conformidade com a LGPD (Lei nº 13.709/2018)</p>
        </CardHeader>
        <CardContent className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <section>
            <h3 className="text-base font-semibold text-white mb-2">1. Coleta e Finalidade de Dados</h3>
            <p>
              O CodeQuest coleta apenas as informações essenciais para funcionamento da plataforma: nome, endereço de e-mail e dados públicos do GitHub (quando voluntariamente associados pelo usuário).
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-white mb-2">2. Direitos do Titular (LGPD)</h3>
            <p>
              O usuário possui o direito de consultar, corrigir, exportar em formato legível (JSON - RF21a) e solicitar a exclusão definitiva/anonimização de sua conta a qualquer momento (RF01g, RNF06).
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-white mb-2">3. Regras de Conduta e Moderação</h3>
            <p>
              Fichas de personagem com termos ofensivos, spam ou que firam as diretrizes da comunidade poderão ser denunciadas (RF19) e arquivadas após mediação da equipe de moderação (RF19a).
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
