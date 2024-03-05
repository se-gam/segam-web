'use client';

/* eslint-disable import/no-extraneous-dependencies */

import { useMemo, useEffect, createContext } from 'react';
import { init, track } from '@amplitude/analytics-browser';

export interface AmplitudeContextValue {
  trackAmplitudeEvent: (eventName: string, eventProperties?: Record<string, any>) => void;
}

export const AmplitudeContext = createContext<AmplitudeContextValue>({
  trackAmplitudeEvent: () => {},
});

function AmplitudeContextProvider({ children }: any) {
  useEffect(() => {
    init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY as string, undefined, {
      defaultTracking: {
        sessions: true,
      },
    });
  }, []);

  const trackAmplitudeEvent = (eventName: any, eventProperties: any) => {
    track(eventName, eventProperties);
  };

  const value = useMemo(() => ({ trackAmplitudeEvent }), []);

  return <AmplitudeContext.Provider value={value}>{children}</AmplitudeContext.Provider>;
}

export default AmplitudeContextProvider;
