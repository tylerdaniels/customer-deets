terraform {
  required_version = ">= 1.11.0"

  # TODO: Switch to S3 backend for shared state and locking
  # backend "s3" {}
}

provider "aws" {
  region = "ap-southeast-2"
}
