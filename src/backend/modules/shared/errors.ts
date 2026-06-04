import { HttpException, HttpStatus } from "@nestjs/common";

export type ErrorDetail = {
  field: string;
  issue: string;
};

export function apiError(status: HttpStatus, code: string, message: string, details?: ErrorDetail[]): HttpException {
  return new HttpException({ code, message, details }, status);
}
