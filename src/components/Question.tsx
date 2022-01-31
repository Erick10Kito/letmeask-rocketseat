import { ReactNode } from 'react';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }

    children?: ReactNode;

}

export function Question(props: QuestionProps) {
    return (
        <div className="question">
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

