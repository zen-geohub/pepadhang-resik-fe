import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

interface LoginContext {
  user: {
    username: string;
    password: string;
  };
  setUser: Dispatch<SetStateAction<{ username: string; password: string }>>;
  isLogin: {
    role: string;
    user: string;
  };
  setIsLogin: Dispatch<SetStateAction<{ role: string; user: string }>>;
}

export const LoginData = createContext<LoginContext>({
  user: {
    username: "",
    password: "",
  },
  setUser: () => {},
  isLogin: {
    role: "",
    user: "",
  },
  setIsLogin: () => {},
});

export const LoginContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState<{ role: string; user: string }>({
    role: "",
    user: "",
  });

  useEffect(() => {
    const { username, password } = user;

    (async () => {
      try {
        if (username !== "") {
          const response = await fetch(`${import.meta.env.VITE_BACKEND}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error(`Login failed! Status: ${response.status}`);
          }

          const data = await response.json();
          if (data.message === "Berhasil login!") {
            setIsLogin({
              user: data.user,
              role: data.role,
            });
            sessionStorage.setItem('user', data.user)
          } else {
            setIsLogin({
              role: "",
              user: "",
            });
          }

          toast(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  useEffect(() => {
    sessionStorage.getItem('user') && (async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/login`, {
          method: "GET",
          credentials: "include",
        });
        const auth = await response.json();
        if (response.ok) {
          setIsLogin({
            user: auth.user,
            role: auth.role,
          });
        }
      } catch (error) {
        console.error
      }
    })();
  }, []);

  return (
    <LoginData.Provider value={{ isLogin, setIsLogin, user, setUser }}>
      {children}
    </LoginData.Provider>
  );
};
