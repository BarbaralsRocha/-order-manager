/* eslint-disable @typescript-eslint/no-explicit-any */
interface MockContractProps {
  output?: any;
  success?: boolean;
  error?: any;
  message?: string | null;
  validationResults?: any;
}

export interface ContractResponse<T, V = null> {
  message?: string;
  output: T;
  success: boolean;
  exception: any;
  validationResults?: V;
}

export const mockContract = ({
  output,
  success = true,
  error = false,
  validationResults = null,
}: MockContractProps): ContractResponse<any, any> => ({
  output,
  success,
  exception: null,
  validationResults,
  ...(error && { error }),
});
