import { onAuthStateChanged } from 'firebase/auth/cordova';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';

export const UserContext = createContext({
  user: null,
  setUser: (user: any) => {user}
});

export const useUserContext = () => useContext(UserContext);

const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState(null as any);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  if(user === false) return <div>Loading...</div>

  return <UserContext.Provider value={
    {
      user,
      setUser
    }
  }>{children}</UserContext.Provider>;
}

export default UserContextProvider;