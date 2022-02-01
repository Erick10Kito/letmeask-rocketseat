import { ReactNode, useState } from 'react';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }

    children?: ReactNode;
    isAnswered?: boolean;
    isHighLighted?: boolean;

}

export function Question(props: QuestionProps) {

    let isAnswered = props.isAnswered;
    let isHighLighted = props.isHighLighted;
    return (
        <div className={`question ${isAnswered ? 'answered' : ''} ${isHighLighted && !isAnswered ? 'highlighted' : ''}`} >
            <p>{props.content}</p>
            <footer>
                <div className="user-info">
                    <img src={props.author.avatar} alt={props.author.name} />
                    <span className="name-auth">{props.author.name}</span>
                </div>
                <div>
                    {props.children}
                </div>
            </footer>
        </div>
    );
}

