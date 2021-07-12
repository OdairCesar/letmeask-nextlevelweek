import '../styles/question.scss'

type QuestionProps = {
    content: string,
    author:{
        name: string,
        avatar: string
    }
}

export function Question( props : QuestionProps){
    return(
        <div className="question">
            <p>{props.content}</p>
            <footer>
                <div className="user-footer">
                    <img src="" alt="" />
                    <span>{props.author.name}</span>
                </div>
                <div></div>
            </footer>
        </div>
    )
}