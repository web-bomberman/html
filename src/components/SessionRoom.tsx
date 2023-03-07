import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { useGetLevels, usePickLevel, useStartGame } from 'api';
import { SessionRoomPlayer, SessionRoomLevel } from 'components';
import { GameData } from 'types';

import {
  Typography,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Button,
  SelectChangeEvent
} from '@mui/material';

export function SessionRoom(props: { player: 1 | 2, game: GameData }) {
  const { player, game } = props;
  const levels = useGetLevels();
  const [levelLoading, pickLevel, level] = usePickLevel(levels, game.level);
  const [starting, start] = useStartGame();
  const { sessionId } = useParams();

  const ready = level &&
    !starting &&
    game.player1 === 'ready' &&
    game.player2 === 'ready';
  
  const handlePickLevel = (e: SelectChangeEvent<string>) => {
    pickLevel(e.target.value);
  };
  
  return (
    <div css={css`
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    `}>
      <Typography
        variant='h2'
        color='text.primary'
        sx={{ marginTop: '64px' }}
      >
        Game Session
      </Typography>
      <div css={css`
        width: 100%;
        margin: 32px 0px;
        padding: 0px 32px;
        display: flex;
        justify-content: space-between;
        @media (max-width: 1024px) {
          padding: 0px 16px;
        }
      `}>
        <Typography variant='body1' color='text.primary'>
          {`Session ID: ${sessionId}`}
        </Typography>
        {player === 1 ? (
          levels && level ? (
            <FormControl sx={{ minWidth: '160px' }}>
              <InputLabel color='primary' id='level-label'>
                Level
              </InputLabel>
              <Select
                id='level-select'
                labelId='level-label'
                label='Level'
                value={level.name}
                color='primary'
                onChange={handlePickLevel}
              >
                {levels.map((level, index) => (
                  <MenuItem value={level.name} key={index}>
                    {level.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <Typography variant='body1' color='text.primary'>
              Loading levels...
            </Typography>
          )
        ) : (
          levels && level ? (
            <Typography variant='body1' color='text.primary'>
              {`Level: ${level.name}`}
            </Typography>
          ) : (
            <Typography variant='body1' color='text.primary'>
              Loading levels...
            </Typography>
          )
        )}
      </div>
      {level ? (
        levelLoading ? (
          <Typography
            variant='body1'
            color='text.primary'
            alignSelf='center'
            sx={{
              marginTop: '64px',
              marginBottom: '196px'
            }}
          >
            Loading...
          </Typography>
        ) : (
          <SessionRoomLevel level={level} />
        )
      ) : <></>}
      <div css={css`
        width: 100%;
        display: flex;
        padding: 0 64px;
        justify-content: space-between;
        @media (max-width: 1024px) {
          padding: 0 32px;
        }
      `}>
        <SessionRoomPlayer
          variant={1}
          player={player}
          player1State={game.player1}
          player2State={game.player2}
        />
        <SessionRoomPlayer
          variant={2}
          player={player}
          player1State={game.player1}
          player2State={game.player2}
        />
      </div>
      {player === 1 ? (
        <Button
          variant='contained'
          color='primary'
          size='large'
          disabled={!ready}
          onClick={start}
          sx={{ marginTop: '64px' }}
        >
          {ready ? 'Start game' : 'Both players must be ready'}
        </Button>
      ) : <></>}
    </div>
  );
}