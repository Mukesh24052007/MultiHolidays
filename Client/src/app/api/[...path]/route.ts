import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const API_BASE_URL = process.env.NEXT_PRIVATE_API_URL?.replace(/\/$/, '');

async function proxyToApi(request: NextRequest, pathSegments: string[]) {
  if (!API_BASE_URL) {
    return NextResponse.json(
      { success: false, message: 'API URL is not configured.' },
      { status: 500 }
    );
  }

  const targetPath = `/${pathSegments.join('/')}${request.nextUrl.search}`;
  const targetUrl = new URL(targetPath, API_BASE_URL);

  const headers = new Headers(request.headers);
  headers.delete('host');
  headers.delete('content-length');

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: 'manual',
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    const bodyText = await request.text();
    if (bodyText) {
      init.body = bodyText;
    }
  }

  const upstream = await fetch(targetUrl, init);
  const responseText = await upstream.text();

  const responseHeaders = new Headers(upstream.headers);
  responseHeaders.delete('content-length');
  responseHeaders.delete('transfer-encoding');

  const setCookies = upstream.headers.getSetCookie?.() ?? [];
  for (const cookie of setCookies) {
    responseHeaders.append('set-cookie', cookie);
  }

  return new NextResponse(responseText, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}

function getPathSegments(request: NextRequest) {
  const trimmed = request.nextUrl.pathname.replace(/^\/api\/?/, '');
  return trimmed.split('/').filter(Boolean);
}

export async function GET(request: NextRequest) {
  return proxyToApi(request, getPathSegments(request));
}

export async function POST(request: NextRequest) {
  return proxyToApi(request, getPathSegments(request));
}

export async function PUT(request: NextRequest) {
  return proxyToApi(request, getPathSegments(request));
}

export async function PATCH(request: NextRequest) {
  return proxyToApi(request, getPathSegments(request));
}

export async function DELETE(request: NextRequest) {
  return proxyToApi(request, getPathSegments(request));
}

export async function OPTIONS(request: NextRequest) {
  return proxyToApi(request, getPathSegments(request));
}
