import { useEffect, useState } from "react";
import { isCallLikeExpression } from "typescript";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
    likes: Record<string, {
        authorId: string;
    }>
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
    likeCount: number;
    likeId: string | undefined;
}

export function useRoom(roomId: string) {
    const { user } = useAuth();
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
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
                }
            })

            setTitle(databaseRoom.tittle);
            setQuestions(parsedQuestions);


        })

        return () => {
            roomRef.off('value');
        }
    }, [roomId]);

    return { questions, title };

}