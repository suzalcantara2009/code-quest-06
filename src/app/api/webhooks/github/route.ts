import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // RF15a: Quando a validação for automática via Webhook do GitHub,
  // o servidor deve verificar a assinatura HMAC do payload recebido antes de processar.
  const signature = request.headers.get('x-hub-signature-256');

  if (!signature) {
    return NextResponse.json(
      { sucesso: false, mensagem: 'Assinatura HMAC ausente' },
      { status: 401 }
    );
  }

  // Boilerplate para validação HMAC e processamento
  return NextResponse.json({
    sucesso: true,
    mensagem: 'Webhook recebido com sucesso',
  });
}
