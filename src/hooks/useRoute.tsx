import { useLocation, useNavigate } from 'react-router-dom';
import { useNotify } from 'react-observer-implementation';
import { UseRouteResponse } from 'types';

export function useRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const startTransition = useNotify('route_changing');
  const finishTransition = useNotify('route_changed');

  const changeRoute = (newRoute: string) => {
    startTransition();
    setTimeout(() => {
      navigate(newRoute);
      finishTransition();
    }, 500);
  };

  return {
    route: location.pathname,
    changeRoute
  } as UseRouteResponse;
}