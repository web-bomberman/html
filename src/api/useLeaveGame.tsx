import { useRequest, useRoute, useToken } from 'hooks';

export function useLeaveGame() {
  const { token } = useToken();
  const { changeRoute } = useRoute();
  const { loading, post } = useRequest('/sessions/leave');

  const request = () => {
    post(
      {},
      () => changeRoute('/'),
      () => changeRoute('/'),
      { headers: {
        Authorization: `Bearer ${token}`
      }}
    );
  };

  return [loading, request] as [
    loading: boolean,
    request: () => void
  ];
}