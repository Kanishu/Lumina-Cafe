import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Here you would typically connect to MongoDB
    // import { connectToDatabase } from '@/lib/mongodb';
    // const db = await connectToDatabase();
    // await db.collection('reservations').insertOne(body);
    
    console.log('Received reservation request:', body);

    // Simulate database delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(
      { message: 'Reservation confirmed successfully', data: body },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process reservation' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return mock reservations
  return NextResponse.json([
    { id: 1, name: 'John Doe', date: '2026-05-10', time: '19:00', guests: 2 }
  ]);
}
