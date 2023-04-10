export type Vector = [number, number];

export type PlayerState =
  | 'waiting'
  | 'not ready'
  | 'ready'
  | 'connected'
  | 'reconnecting'
  | 'disconnected';

export type SessionState =
  | 'room'
  | 'starting'
  | 'running'
  | 'interrupted'
  | 'player1 won'
  | 'player2 won'
  | 'draw';

export type GameObject = {
  type: string;
  position: Vector;
  extras: string[];
};

export type GameData = {
  id: string;
  state: SessionState;
  player1: PlayerState;
  player2: PlayerState;
  size: Vector;
  level: string;
  gameObjects: { [id: string]: GameObject };
};

export type LevelTile =
  | 'player1'
  | 'player2'
  | 'destructible'
  | 'indestructible';

export type Level = {
  name: string;
  size: Vector;
  objects: { object: LevelTile; position: Vector }[];
};

export type ContainerProps = {
  bordered?: boolean;
  margin?: string;
  width?: string;
  height?: string;
};
