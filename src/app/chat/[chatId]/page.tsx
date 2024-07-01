import { getChatDetail } from "@/actions/chat.action"
import { IndividualChatPage } from "./components"

type ChatPageProps = {
  params:{
    chatId: string
  }
}

const ChatPage = async ({params}: ChatPageProps) => {
  console.log(params)
  const chatDetails = await getChatDetail(params.chatId);
  console.log(chatDetails)

  if(chatDetails.error){
    return <div>{chatDetails.error}</div>
  }
  return <IndividualChatPage chatDetails={chatDetails} />
}

export default ChatPage