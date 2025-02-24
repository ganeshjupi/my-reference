import authApi from '@/_service/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getServerSession() {
  // Get cookies from request
  const cookieStore = cookies();
  const tkn = cookieStore.get('tk')?.value;  

  if (!tkn) {
    redirect("/signin")    
  }
  const data = await authApi.getSession(tkn);
  
  return { user:{...data, authToken:tkn} }; 
 
}
