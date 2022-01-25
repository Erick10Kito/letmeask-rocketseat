
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string;
}

type AuthContextType = {
    user: User | undefined;
    singInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode;
}
//Quando a children for um componente uso isso(ReactNode)


export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

    const [user, setUser] = useState<User>();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            //vai no firebase e procura se existe um login pré feito ja 
            if (user) {
                const { displayName, photoURL, uid } = user


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
        })
        return () => {
            unsubscribe();
        }
    }, [])

    async function singInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        //texto acima serve para fazer a authenticação com o google , no caso aqui , eu importei tanto o firebase como o auth , só observar acima
        const result = await auth.signInWithPopup(provider);

        //auth.signInWithPopup(provider).then(result => {
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



    return (
        <AuthContext.Provider value={{ user, singInWithGoogle }}>
            {props.children}

        </AuthContext.Provider>
    );
}