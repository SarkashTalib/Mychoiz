import React, { useState } from 'react';

function ErrorBoundary(props) {
  const [hasError, setHasError] = useState(false);

  function handleOnError(error) {
    setHasError(true);
  }

  if (hasError) {
    return <p className="text-center text-red-500 text-lg p-10">Something went wrong.</p>;
  }

  return <div onError={handleOnError}>{props.children}</div>;
}

export default ErrorBoundary;
