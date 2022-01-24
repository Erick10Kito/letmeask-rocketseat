import { error } from 'console';
import { createContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { auth, firebase } from './services/firebase';

export const AuthContext = createContext({} as any)

function App() {
  const [user, setUser] = useState()

  function singInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    //texto acima serve para fazer a authenticação com o google , no caso aqui , eu importei tanto o firebase como o auth , só observar acima

    auth.signInWithPopup(provider).then(result => {
      //resultado da authenticação é oque mostra abaixou , ou seja quando for feito o login ele vai para a pagina especificada
      console.log(result);

      if (result.user) {
        const { displayName, photoURL, uid } = result.user


        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        }

        )
      }
    }

}
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ value, setValue }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>

  );
}

export default App;
