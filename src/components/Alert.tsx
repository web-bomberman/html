import { useAlertData } from 'react-styled-alert';
import { Container } from 'components';
import { Button } from '@mui/material';
import { css } from '@emotion/react';

export function Alert() {
  const data = useAlertData();
  if (!data) return <></>;

  return (
    <div
      css={css`
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        z-index: 5;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <Container width='420px' blur='3px' bordered>
        {data.content}
        <div
          css={css`
            width: 100%;
            margin-top: 32px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
          `}
        >
          <Button
            id='alert-ok'
            onClick={data.onOk}
            color='primary'
            variant='contained'
          >
            Ok
          </Button>
          {data.onCancel ? (
            <Button
              id='alert-cancel'
              onClick={data.onCancel}
              color='primary'
              variant='outlined'
            >
              Cancel
            </Button>
          ) : (<></>)}
        </div>
      </Container>
    </div>
  );
}