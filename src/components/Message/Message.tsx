import styles from './Message.module.scss'

interface IMessage {
    id: string;
    senderId: string;
    date: number;
    text?: string;
    currentUserUid: string;
    file?: string;
}

const Message = (props: IMessage) => {
    const getTimeForChats = (timestamp: number) => {
        const date = new Date(timestamp)
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    }

    if (props.senderId === props.currentUserUid) {
        return (
            <div className={styles.myMessageLine}>
                <div className={styles.message}>
                    {
                        props.file === undefined ? <span>{props.text}</span> : <img src={props.file} />
                    }
                    <span>{getTimeForChats(props.date)}</span>
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.messageLine}>
                <div className={styles.message}>
                    {
                        props.file === undefined ? <span>{props.text}</span> : <img src={props.file} />
                    }
                    <span>{getTimeForChats(props.date)}</span>
                </div>
            </div>
        )
    }
}

export default Message