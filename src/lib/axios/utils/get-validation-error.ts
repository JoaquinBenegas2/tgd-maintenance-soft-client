import { TypeWithKey } from "../models/type-with-key";

export const getValidationError = (errorCode: any) => {
  const configuration: TypeWithKey<string> = {
    ERR_NETWORK: "Network Error",
    ERR_BAD_REQUEST: "Bad Request",
    ERR_UNAUTHORIZED: "Unauthorized",
    ERR_FORBIDDEN: "Forbidden",
    ERR_NOT_FOUND: "Not Found",
    ERR_BAD_GATEWAY: "Bad Gateway",
    ERR_SERVICE_UNAVAILABLE: "Service Unavailable",
    ERR_GATEWAY_TIMEOUT: "Gateway Timeout",
    ERR_INTERNAL_SERVER_ERROR: "Internal Server Error",
    ERR_UNKNOWN: "Unknown Error",
    ERR_NO_RESPONSE: "No response from server",
    ERR_NO_DATA: "No data received from server",
  };

  return configuration[errorCode] || "An unexpected error occurred";
};
