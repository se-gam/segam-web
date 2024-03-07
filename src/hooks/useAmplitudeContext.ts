'use client';

import { useContext } from 'react';
import { AmplitudeContext, AmplitudeContextValue } from '@/context/amplitudeContext';

const useAmplitudeContext = (): AmplitudeContextValue => {
  const context = useContext(AmplitudeContext);
  if (context === undefined) {
    throw new Error('useAmplitudeContext must be used within a AmplitudeContextProvider');
  }
  return context;
};

export default useAmplitudeContext;
