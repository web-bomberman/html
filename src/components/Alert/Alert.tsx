import { useAlertData } from 'react-styled-alert';
import { Container } from 'components';
import { Button, Typography } from '@mui/material';
import { Background, ButtonContainer } from './Alert.style';

export function Alert() {
  const data = useAlertData();
  if (!data) return <></>;

  return (
    <Background>
      <Container width='420px' bordered extra='backdrop-filter: blur(3px)'>
        <Typography variant='body1' color='text.primary'>
          {data.content}
        </Typography>
        <ButtonContainer>
          <Button
            onClick={data.onOk}
            color='primary'
            variant='contained'
          >
            Ok
          </Button>
          {data.onCancel ? (
            <Button
              onClick={data.onCancel}
              color='success'
              variant='outlined'
            >
              Cancel
            </Button>
          ) : (<></>)}
        </ButtonContainer>
      </Container>
    </Background>
  );
}