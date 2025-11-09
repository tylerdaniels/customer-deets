import { Context } from "aws-lambda";
import { CustomerRepository } from "./services/customer-repository";

export type CustomerDeetsContext = {
  repository: CustomerRepository;
} & Context;

export type Customer = {
  id: string;
  name: string;
  email: string;
  registrationDate: string;
};
