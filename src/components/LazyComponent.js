import React, { Suspense } from "react";

const LazyComponent = ({ path }) => {
  const Component = React.lazy(() => import(`/${path}`));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
};

export default LazyComponent;