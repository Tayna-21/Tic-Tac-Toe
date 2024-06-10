interface Winner {
    symbol: string | null,
    strike: string | null
}

interface WinCount {
    field_x: number,
    field_0: number
}

interface Hint {
    field_x: string,
    field_0: string
}

interface Disabled {
    field_x: string,
    field_0: string
}

interface Messages {
    value: string,
    id: string
}

interface CurrentMessage {
    field_1: string,
    field_2: string
}

export interface GameState {
    cells: (string |null)[],
    currentMove: string,
    winner: Winner,
    winCount: WinCount,
    hint: Hint,
    disabled: Disabled,
    messages: Messages[],
    currentMessage: CurrentMessage
}

export interface PlayerProps {
    id: string,
    symbol: string
}

export interface GameFieldProps {
    symbol: string
}

export interface CellProps {
    children: React.ReactNode,
    id: string,
    onClick: (event: React.MouseEvent<HTMLElement>) => void
}

export interface HintProps {
    id: string
}

export interface ChatProps {
    playerId: string
}

export interface InputProps {
    onSubmit:  (event: React.FormEvent<HTMLFormElement>) => void,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value: string
}

export interface MessageProps {
    nameOfClass: string,
    value: string
}

export interface Data {
    value: string,
    id: string
}
