import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

interface LoginContext {
  user: {
    username: string;
    password: string;
  }
  setUser: Dispatch<SetStateAction<{username: string; password: string}>>
  isLogin: boolean;
  setIsLogin: Dispatch<
    SetStateAction<boolean>
  >;
}

const LoginData = createContext<LoginContext>({
  user: {
    username: "",
    password: ""
  },
  setUser: () => {},
  isLogin: false,
  setIsLogin: () => {},
});

export const LoginContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{username: string; password: string}>({
    username: "",
    password: ""
  })
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    (async() => {
      try {
        if (user.username !== "") {
          const response = await fetch(`${import.meta.env.VITE_LOGIN}/login`, {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: user.username,
              password: user.password
            }),
            credentials: 'include'
          })
  
          if (!response.ok) {
            throw new Error(`Login failed! Status: ${response.status}`)
          }
  
          const data = await response.json()
          if (data.RTN) {
            setIsLogin(true)
          } else {
            setIsLogin(false)
          }
          
          toast(data.MSG)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [user])

  return (
    <LoginData.Provider value={{ isLogin, setIsLogin, user, setUser }}>
      {children}
    </LoginData.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoginData);

  return context;
};
