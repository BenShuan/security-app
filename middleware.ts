import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// Don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};

const middleware = async (request: NextRequest) => {

  return NextResponse.next();
  // const { nextUrl } = request;
  // const user = await getSession();


  // if (user) {
  //   return NextResponse.next();
  // }

  // return NextResponse.redirect(new URL('/login', nextUrl));
};

export default middleware;

