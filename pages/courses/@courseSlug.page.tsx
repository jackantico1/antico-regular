import React from 'react';
import { usePageContext } from '../../renderer/usePageContext';

function Page() {
  const { routeParams } = usePageContext();
  return (
    <>
      <h1>Welcome to {routeParams.courseSlug}</h1>
    </>
  );
}

export { Page };