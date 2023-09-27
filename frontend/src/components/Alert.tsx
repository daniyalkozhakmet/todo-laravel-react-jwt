import React from "react";

const Alert = ({
  message,
  className,
}: {
  message: string;
  className: string;
}) => {
  return <div className={`alert alert-${className}`}>{message}</div>;
};

export default Alert;
