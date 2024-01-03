interface Message {
    name: string,
    sendName: string,
    image: string,
    message: string,
    postDate: Date|string
    postTime: Date|string
}

interface Chat {
    name: string,
    image: string,
    sendName: string,
    userCount: number,
    isActive: boolean,
    unreadMessages: number,
    messageList: Message[]
}

export { Message, Chat }
