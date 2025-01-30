import NextAuth from "next-auth"; // Adjust the import path for your NextAuth options
import { NEXT_AUTH_HANDLER } from "../../../../../auth";


// Export the handler explicitly for GET and POST
const handler = NextAuth(NEXT_AUTH_HANDLER);

export { handler as GET, handler as POST };