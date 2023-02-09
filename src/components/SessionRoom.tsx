import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { GameData } from 'types';
import Player1 from 'assets/player1.gif';
import Player2 from 'assets/player2.gif';

import {
  Typography,
  Button,
  Select,
  InputLabel,
  MenuItem,
  Checkbox,
  SelectChangeEvent,
  FormGroup,
  FormControlLabel
} from '@mui/material';


export function SessionRoom(props: { player: 1 | 2, game: GameData }) {
  const [level, setLevel] = useState<number>(0);
  const [ready, setReady] = useState<boolean>(false);
  const { sessionId } = useParams();

  const handleReady = (e: SelectChangeEvent<boolean>) => {
    setReady(e.target.value as boolean);
  };

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
        display: flex;
        justify-content: space-between;
      `}>
        <Typography variant='body1' color='text.primary'>
          {`Session ID: ${sessionId}`}
        </Typography>
        <InputLabel color='primary' id='level-label'>
          Level
        </InputLabel>
        <Select
          id='level-select'
          labelId='level-label'
          label='Level'
          value={level}
          color='primary'
          onChange={(e) => setLevel(e.target.value as number)}
        >
          <MenuItem value={0}>Basic</MenuItem>
          <MenuItem value={1}>Something</MenuItem>
          <MenuItem value={2}>Other thing</MenuItem>
        </Select>
      </div>  
      <div css={css`
        width: 100%;
        display: flex;
        justify-content: space-between;
      `}>
        <div css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}>
          <Typography variant='body1' color='secondary'>
            Player 1
          </Typography>
          <img
            src={Player1}
            css={css`
              width: 64px;
            `}
          />
          {props.player === 1 ? (
            <>
              <Typography variant='body1' color='secondary'>
                YOU
              </Typography>
              <FormGroup>
                <FormControlLabel
                  label='Ready'
                  color='secondary'
                  control={
                    <Checkbox
                      color='secondary'
                      checked={ready}
                      onChange={handleReady}
                    />
                  }
                />
              </FormGroup>
            </>
          ) : <></>}
        </div>
        <div css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}>
          <Typography variant='body1' color='error'>
            Player 2
          </Typography>
          <img
            src={Player2}
            css={css`
              width: 64px;
              margin: 16px 0px;
            `}
          />
          {props.player === 2 ? (
            <>
              <Typography variant='body1' color='error'>
                YOU
              </Typography>
              <FormGroup>
                <FormControlLabel
                  label='Ready'
                  color='error'
                  control={
                    <Checkbox
                      color='error'
                      checked={ready}
                      onChange={handleReady}
                    />
                  }
                />
              </FormGroup>
            </>
          ) : <></>}
        </div>
      </div>
    </div>
  );
}