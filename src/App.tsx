import { Routes, Route } from 'react-router-dom';
import { Alert, RootContainer } from 'components';
import { Landing, Credits, Session } from 'pages';

export function App() {
  return (
    <>
      <RootContainer>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/session/:sessionId' element={<Session />} />
          <Route path='/credits' element={<Credits />} />
        </Routes>
      </RootContainer>
      <Alert />
    </>
  )
}