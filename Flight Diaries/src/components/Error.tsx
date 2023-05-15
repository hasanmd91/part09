import { AxiosError } from "axios";
import React from "react";

type ErrorProps = {
  error: AxiosError | string;
};

const Error = ({ error }: ErrorProps) => {
  if (error instanceof AxiosError) {
    return <div>{error.message}</div>;
  } else {
    return <div>{error.toString()}</div>;
  }
};

export default Error;
