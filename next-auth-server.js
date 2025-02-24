import { cookies } from 'next/headers'; // Use Next.js built-in headers API

export async function getServerSession() {
  // Get cookies from request
  const cookieStore = cookies();
  const tkn = cookieStore.get('tk')?.value;  

  if (!tkn) {
    return null; // No session found
  }

  
  return { user:{email: 'user@example.com', authToken:tkn} }; // Dummy user
 
}


