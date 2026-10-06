import { NextResponse } from 'next/server';
import { validarUsernameGithub } from '@/lib/github';

export async function GET(
  _request: Request,
  { params }: { params: { username: string } }
) {
  const { username } = params;

  if (!validarUsernameGithub(username)) {
    return NextResponse.json(
      { sucesso: false, mensagem: 'Nome de usuário do GitHub inválido' },
      { status: 422 }
    );
  }

  // Estrutura de consulta ao GitHub Cache / API com timeout de 3s (RF11, RF12)
  return NextResponse.json({
    sucesso: true,
    dados: null,
  });
}
