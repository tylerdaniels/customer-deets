import { Context } from "aws-lambda";
import { CustomerRepository } from "./services/customer-repository";

export type CustomerDeetsContext = {
  repository: CustomerRepository;
} & Context;
