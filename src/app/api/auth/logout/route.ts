import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revogarSessao, SESSION_COOKIE_NAME } from '@/lib/auth';

export async function POST() {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (sessionCookie) {
      await revogarSessao(sessionCookie);
    }

    const response = NextResponse.json({
      sucesso: true,
      mensagem: 'Sessão encerrada com sucesso',
    });

    // Remove o cookie da sessão
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error('Erro ao efetuar logout:', error);
    return NextResponse.json(
      { sucesso: false, mensagem: 'Erro interno ao encerrar sessão' },
      { status: 500 }
    );
  }
}
