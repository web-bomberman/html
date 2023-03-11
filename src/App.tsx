import { Routes, Route } from 'react-router-dom';
import { Alert, Background, RootContainer } from 'components';
import { Landing, Credits, Session } from 'pages';

export function App() {
  return (
    <>
      <Background />
      <RootContainer>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/credits' element={<Credits />} />
          <Route path='/:sessionId' element={<Session />} />
        </Routes>
      </RootContainer>
      <Alert />
    </>
  )
}