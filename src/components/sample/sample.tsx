import React from 'react';

export default function Sample({
  label,
  type,
}: {
  label: string;
  type: string;
}) {
  const styles: {
    [key: string]: string;
  } = {
    primary: 'bg-theme_primary text-blue-50',
    secondary: 'bg-theme_secondary text-blue-50',
  };

  return <span className={`px-4 py-2 ${styles[type]}`}>{label}</span>;
}
