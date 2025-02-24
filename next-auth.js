"use client"
import authApi from '@/_service/auth';
import { redirect, usePathname } from 'next/navigation';
import { createContext, useState, useEffect, useContext } from 'react';


// Create AuthContext
const AuthContext = createContext({});

const getCookie = (name:any) => {
  const value = `; ${document.cookie}`;
  // console.log({value})
  const parts  = value?.split(`; ${name}=`) as any;    
  if (parts.length === 2) return parts.pop().split(';').shift();
};



export function AuthProvider({ children }:any) {
  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(true);
  const pathname = usePathname()


  // Fetch user session from API on mount
  useEffect(() => {

    async function loadUser(tkn:any) {
      try {
        const data = await authApi.getSession(tkn);        
        setUser({...data,authToken:tkn});
       
        console.log("auth-> ",{user,tkn,pathname})
      } catch (error) {
        console.error('Failed to load session:', error);
      }
      setLoading(false);
    }
    console.log("auth-> ",{user,pathname})
    const tk = getCookie("tk");
    if (!tk) {
      if(pathname === "/signin") return;      
      redirect("/signin")
    }

    loadUser(tk);
  }, []);



  // Login function
  async function login({email, password}:any) {

    const data = await authApi.login({username:email,password})
    if(data.token){
      if(process.env.NODE_ENV === 'production'){
        document.cookie = "tk="+data.token+"; path=/; domain=.myuaestartup.com; Secure; SameSite=None";
      }
      else{
        document.cookie = "tk="+data.token+"; path=/;"
      }
      setUser({...data.user,authToken:data.token});     
      return {auth:true};
    }    
    return data;
  }



  // Logout function
  async function logout() {
    if(process.env.NODE_ENV === 'production'){
      document.cookie = "tk=; path=/; domain=.myuaestartup.com; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=None";
    }
    else{
      document.cookie = "tk=; path=/;  expires=Thu, 01 Jan 1970 00:00:00 UTC; "
    }        
    const url = window.location.origin+'/signin';
    window.history.pushState({},"",url);
    window.location.reload(); 
   
  }



  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


// Hook to use AuthContext
export function useSession() {
  return useContext(AuthContext);
}


