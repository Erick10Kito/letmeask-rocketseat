import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
}>

type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
}

export function useRoom(roomId: string) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState('')


    useEffect(() => {
        //o firebase retorna a pergunta como objeto ao inves de array e esse usoEffect faz com que ele retorne array
        console.log(roomId)
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {

                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered,
                }
            })

            setTitle(databaseRoom.tittle);
            setQuestions(parsedQuestions);


        })
    }, [roomId]);

    return { questions, title };

}