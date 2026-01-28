import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface Inquiry {
  id?: number;
  name: string;
  phone: string;
  message: string;
  status: '대기중' | '연락완료' | '상담완료';
  created_at?: string;
}

async function sendDiscordNotification(inquiry: Inquiry) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('Discord webhook URL not configured');
    return;
  }

  const embed = {
    title: '새로운 상담 문의가 접수되었습니다!',
    color: 0x3b82f6,
    fields: [
      {
        name: '이름',
        value: inquiry.name,
        inline: true,
      },
      {
        name: '전화번호',
        value: inquiry.phone,
        inline: true,
      },
      {
        name: '상담 문의',
        value: inquiry.message,
        inline: false,
      },
    ],
    footer: {
      text: '모두정보통신',
    },
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });
  } catch (error) {
    console.error('Failed to send Discord notification:', error);
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

    const inquiry: Inquiry = {
      name,
      phone,
      message,
      status: '대기중',
    };

    // Save to Supabase
    const { data, error } = await supabase
      .from('inquiries')
      .insert([inquiry])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: '데이터 저장 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // Send Discord notification
    await sendDiscordNotification(inquiry);

    return NextResponse.json({ success: true, inquiry: data });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
