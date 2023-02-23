import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { useGetLevels } from 'api';
import { SessionRoomPlayer } from 'components';
import { GameData, Level } from 'types';

import {
  Typography,
  Select,
  InputLabel,
  MenuItem,
  FormControl
} from '@mui/material';


export function SessionRoom(props: { player: 1 | 2, game: GameData }) {
  const [level, setLevel] = useState<string>('');
  const levels = useGetLevels();
  const { sessionId } = useParams();

  return (
    <div css={css`
      width: 100%;
      padding: 0px 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
    `}>
      <div css={css`
        width: 100%;
        margin: 32px 0px;
        display: flex;
        justify-content: space-between;
      `}>
        <Typography variant='body1' color='text.primary'>
          {`Session ID: ${sessionId}`}
        </Typography>
        {levels ? (
          <FormControl sx={{ minWidth: '200px' }}>
            <InputLabel color='primary' id='level-label'>
              Level
            </InputLabel>
            <Select
              id='level-select'
              labelId='level-label'
              label='Level'
              value={level}
              color='primary'
              onChange={(e) => setLevel(e.target.value)}
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
        )}
      </div>  
      <div css={css`
        width: 100%;
        display: flex;
        padding: 0 64px;
        justify-content: space-between;
      `}>
        <SessionRoomPlayer
          variant={1}
          player={props.player}
          player1State={props.game.player1}
          player2State={props.game.player2}
        />
        <SessionRoomPlayer
          variant={2}
          player={props.player}
          player1State={props.game.player1}
          player2State={props.game.player2}
        />
      </div>
    </div>
  );
}