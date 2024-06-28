export type CollaboratorType = {
    id: string
    name: string
    avatar: string
}

export type ChatOptionsType = 'invite_friends' | 'chat_with_friends' | null

export type ChatSuggestionsType = 'generate_notes' | 'create_flashcards' | 'explain' | null