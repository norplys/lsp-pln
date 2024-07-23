import { NextResponse, NextRequest } from "next/server"
 
type ResponseData = {
  message: string
}
 
export function GET(
  req: NextRequest,
) {
  return NextResponse.json<ResponseData>({ message: "Ping Succesfully" })
}