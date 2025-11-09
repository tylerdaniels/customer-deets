variable "name" {
  description = "The Name of the CodeBuild project"
  type        = string
}

variable "description" {
  description = "The Description of the CodeBuild project"
  type        = string
}

variable "service_role" {
  description = "The Service Role ARN of the CodeBuild project"
  type        = string
}

variable "compute_type" {
  description = "The Compute Type of the CodeBuild project"
  type        = string
  default = "BUILD_GENERAL1_SMALL"
}

variable "build_image" {
  description = "The Build Image of the CodeBuild project"
  type        = string
  default = "aws/codebuild/standard:7.0"
}

variable "build_type" {
  description = "The Build Image of the CodeBuild project"
  type        = string
  default = "LINUX_CONTAINER"
}

variable "build_source" {
  description = "The Build Source of the CodeBuild project"
  type        = string
  default = "CODEPIPELINE"
}

variable "buildspec" {
  description = "The Buildspec of the CodeBuild project"
  type        = string
}

variable "environment_variables" {
  description = "The Enviroment Variables to map into the CodeBuild project"
  type        = map(string)
}