import { Routes, Route } from 'react-router-dom';
import { Alert, RootContainer } from 'components';
import { Landing } from 'pages';

export function App() {
  return (
    <>
      <RootContainer>
        <Routes>
          <Route path='/' element={<Landing />} />
        </Routes>
      </RootContainer>
      <Alert />
    </>
  )
}