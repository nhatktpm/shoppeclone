import axios, { AxiosError } from "axios";
import HttpStatusCode from "../constants/httpStatusCode.enum";

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(err: unknown): err is AxiosError<FormError> {
  return isAxiosError(err) && err.response?.status === HttpStatusCode.UnprocessableEntity
}