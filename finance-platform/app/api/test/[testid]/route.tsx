import { NextResponse, NextRequest } from "next/server"

export const GET = (
request: NextRequest, 
{ params } : { params: { testid: string } }
) =>{
    return NextResponse.json({
        message: `This is a test route with id: ${params.testid}`,
        method: request.method,
        url: request.url,
    })
}