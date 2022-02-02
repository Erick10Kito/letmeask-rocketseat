
import { type } from 'os';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import '../styles/Room.scss';
import { Question } from '../components/Question';
import '../styles/question.scss';
import { useRoom } from '../hooks/useRoom';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';






type RoomParams = {
    id: string;
}
//Na linha do RoomCOde code ={params.id? params.id: ""} fiz isso pois o params vem com variavel indefinida , e como não é possivel declarar isso nesse type eu coloquei uma condição caso ela for indefinida nesse código

export function AdminRoom() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const roomId = params.id;
    const { title, questions } = useRoom(roomId ? roomId : '');

    async function handleEndRoom() {
        if (window.confirm('Você deseja encerrar a sala?')) {
            await database.ref(`rooms/${roomId}`).update({
                endedAt: new Date(),
            })

            navigate('/');

        }
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Você tem certeza que deseja excluir essa pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();

        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });

    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighLighted: true,
        });

    }



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
                    <div className='finish-code-room'>
                        <RoomCode code={params.id ? params.id : ""} />
                        <Button isOutlined onClick={handleEndRoom} >Encerrar Sala</Button>
                        <Button>Voltar</Button>
                    </div>


                </div>

            </header>



            <main className='content'>
                <div className='room-title'>
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} Pergunta(s)</span>}
                </div>



                <div className='question-list'>
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                /*essa key serve basicamente para dar um id unico para a pergunta, pra que caso alguem exclua uma pergunta , inves de percorrer toda lista de 100 perguntas
                                 e retornar 99 pois excluiu, ele somente vai excluir a pergunta de id correspondido a ela, se a pergunta tem id 10, somente vai excluir a de id 10*/
                                content={question.content}
                                author={question.author}
                                isHighLighted={question.isHighLighted}
                                isAnswered={question.isAnswered}
                            >
                                {!question.isAnswered &&

                                    <><button
                                        type='button'
                                        onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                    >
                                        <img src={checkImg} alt="Marcar pergunta como respondida" />
                                    </button>
                                        <button
                                            type='button'
                                            onClick={() => handleHighlightQuestion(question.id)}
                                        >
                                            <img src={answerImg} alt="dar destaque a pergunta" />
                                        </button></>
                                }

                                <button
                                    type='button'
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover Pergunta" />
                                </button>
                            </Question>
                        );
                    })}

                </div>
            </main>
        </div>
    )
}