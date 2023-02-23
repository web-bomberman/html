import { AxiosRequestConfig } from 'axios';

export type Vector = [number, number]

export type PlayerState =
| 'waiting'
| 'not ready'
| 'ready'
| 'connected'
| 'reconnecting'
| 'disconnected'

export type SessionState = 
  | 'room'
  | 'starting'
  | 'running'
  | 'over'

export type GameObjectData = {
  id: number | null;
  type: string;
  position: Vector;
  extras: string[];
}

export type GameData = {
  id: string;
  state: SessionState;
  player1: PlayerState;
  player2: PlayerState;
  size: Vector;
  gameObjects: GameObjectData[];
}

export type Object =
  | 'player1'
  | 'player2'
  | 'destructible'
  | 'indestructible'
  | 'bomb'

export type Level = {
  name: string;
  size: Vector;
  objects: { object: Object, position: Vector }[];
}

export type ContainerProps = {
  bordered?: boolean;
  noBackground?: boolean;
  blur?: string;
  margin?: string;
  width?: string;
  height?: string;
}

export type UseRequestResponse<Type> = {
  status: number;
  data: Type;
}

export type UseRequestError = {
  status: number;
  message: string;
}

export type UseRequestAborters = {
  get: AbortController;
  post: AbortController;
  put: AbortController;
  patch: AbortController;
  delete: AbortController;
}

export type UseRequestReturn<Type> = {
  loading: boolean;
  get: (
    thenFn: (res: UseRequestResponse<Type>) => void,
    catchFn: (err: UseRequestError) => void,
    config?: AxiosRequestConfig<any>
  ) => void;
  post: (
    body: object,
    thenFn: (res: UseRequestResponse<Type>) => void,
    catchFn: (err: UseRequestError) => void,
    config?: AxiosRequestConfig<any>
  ) => void;
  put: (
    body: object,
    thenFn: (res: UseRequestResponse<Type>) => void,
    catchFn: (err: UseRequestError) => void,
    config?: AxiosRequestConfig<any>
  ) => void;
  patch: (
    body: object,
    thenFn: (res: UseRequestResponse<Type>) => void,
    catchFn: (err: UseRequestError) => void,
    config?: AxiosRequestConfig<any>
  ) => void;
  delete: (
    thenFn: (res: UseRequestResponse<Type>) => void,
    catchFn: (err: UseRequestError) => void,
    config?: AxiosRequestConfig<any>
  ) => void;
}