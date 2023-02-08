import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNotify } from 'react-observer-implementation';
import { useTimeout } from 'react-timers-hooks';
import { UseRouteResponse } from 'types';

export function useRoute() {
  const [timer, setTimer] = useState<number>(0);
  const [newRoute, setNewRoute] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();
  const startTransition = useNotify('route_changing');
  const finishTransition = useNotify('route_changed');

  useTimeout(() => {
    navigate(newRoute);
    finishTransition();
    setTimer(0);
    setNewRoute('');
  }, timer ? timer : null);

  const changeRoute = (route: string) => {
    startTransition();
    setTimer(500);
    setNewRoute(route);
  };

  return {
    route: location.pathname,
    changeRoute
  } as UseRouteResponse;
}