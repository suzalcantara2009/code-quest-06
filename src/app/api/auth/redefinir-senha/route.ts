import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashSenha } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, novaSenha } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { sucesso: false, mensagem: 'E-mail é obrigatório' },
        { status: 400 }
      );
    }

    if (!novaSenha || typeof novaSenha !== 'string' || novaSenha.length < 8) {
      return NextResponse.json(
        { sucesso: false, mensagem: 'A nova senha deve ter no mínimo 8 caracteres' },
        { status: 422 }
      );
    }

    const emailNormalizado = email.toLowerCase().trim();

    const usuario = await prisma.usuario.findUnique({
      where: { email: emailNormalizado },
    });

    if (!usuario) {
      return NextResponse.json(
        { sucesso: false, mensagem: 'Nenhum usuário encontrado com este e-mail' },
        { status: 404 }
      );
    }

    const novaHash = await hashSenha(novaSenha);

    await prisma.usuario.update({
      where: { id: usuario.id },
      data: {
        senha_hash: novaHash,
        tentativas_login: 0,
        bloqueado_ate: null,
      },
    });

    return NextResponse.json({
      sucesso: true,
      mensagem: 'Senha redefinida com sucesso no banco de dados! Você já pode entrar.',
    });
  } catch (error: any) {
    console.error('Erro ao redefinir senha:', error);
    return NextResponse.json(
      { sucesso: false, mensagem: error?.message || 'Erro interno ao redefinir senha' },
      { status: 500 }
    );
  }
}

