import { NextRequest, NextResponse } from 'next/server';
import { getTestResult } from '@/lib/logStore';

export async function GET(req: NextRequest) {
  const testId = req.nextUrl.searchParams.get('testId');

  if (!testId) {
    return NextResponse.json({ error: 'No testId provided' }, { status: 400 });
  }

  const result = getTestResult(testId);

  if (!result) {
    return NextResponse.json({ error: 'Result not found' }, { status: 404 });
  }

  return NextResponse.json(result);
}
