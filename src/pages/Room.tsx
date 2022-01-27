
import { type } from 'os';
import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import '../styles/Room.scss';


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


type RoomParams = {
    id: string;
}
//Na linha do RoomCOde code ={params.id? params.id: ""} fiz isso pois o params vem com variavel indefinida , e como não é possivel declarar isso nesse type eu coloquei uma condição caso ela for indefinida nesse código

export function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState('')
    const roomId = params.id;


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

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);


        })
    }, [roomId]);

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();
        if (newQuestion.trim() === '') {
            return;
        }
        if (!user) {
            throw new Error('You must be logged in');
        }


        const question = {
            content: newQuestion,
            author: {
                name: user?.name,
                avatar: user.avatar,
            },
            isHighLighted: false,
            isAnswered: false
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);
        setNewQuestion('');
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img className='logoImgElement' src={logoImg} alt="" />
                    <RoomCode code={params.id ? params.id : ""} />

                </div>

            </header>



            <main className='content'>
                <div className='room-title'>
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} Pergunta(s)</span>}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder="O que você quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                    <div className='form-footer'>
                        {user ? (
                            <div className='user-info'>
                                {questions.length !== 0 ? ('')
                                    : (<><img src={user.avatar} alt={user.name} /><span className='name-auth'>{user.name}</span></>)
                                }

                            </div>

                        ) : (<span>Para enviar uma pergunta, <button>faça seu login</button>.</span>)}

                        <Button type='submit' disabled={!user} >Enviar Pergunta</Button>
                    </div>
                </form>

                {JSON.stringify(questions)}
            </main>
        </div>
    )
}