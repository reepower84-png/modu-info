import { NextRequest, NextResponse } from 'next/server';

async function sendDiscordNotification(name: string, phone: string, message: string) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error('Discord webhook URL not configured');
  }

  const embed = {
    title: '새로운 상담 문의가 접수되었습니다!',
    color: 0x3b82f6,
    fields: [
      {
        name: '이름',
        value: name,
        inline: true,
      },
      {
        name: '전화번호',
        value: phone,
        inline: true,
      },
      {
        name: '상담 문의',
        value: message,
        inline: false,
      },
    ],
    footer: {
      text: '모두정보통신',
    },
    timestamp: new Date().toISOString(),
  };

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      embeds: [embed],
    }),
  });

  if (!response.ok) {
    throw new Error(`Discord webhook failed: ${response.status}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: '모든 필드를 입력해 주세요.' },
        { status: 400 }
      );
    }

    await sendDiscordNotification(name, phone, message);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
