"use client";

import { useEffect, useState } from "react";

interface ErrorProps {
  error: Error;
}

const ErrorState: React.FC<ErrorProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-[100vh] flex items-center justify-center">
      Something went wrong!
    </div>
  );
};

export default ErrorState;
