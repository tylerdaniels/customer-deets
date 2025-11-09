module "frontend_validate" {
  source = "./modules/build_project"

  name         = "${local.application_name}-frontend-validate"
  description  = "Validate React project"
  service_role = aws_iam_role.codepipeline_role.arn

  environment_variables = {
    NODE_ENV = "test"
  }
  buildspec = "codebuild/buildspec_react_validate.yml"
}

module "frontend_test" {
  source = "./modules/build_project"

  name         = "${local.application_name}-frontend-test"
  description  = "Test React project"
  service_role = aws_iam_role.codepipeline_role.arn

  environment_variables = {
    NODE_ENV = "test"
  }
  buildspec = "codebuild/buildspec_react_test.yml"
}

module "frontend_build" {
  source = "./modules/build_project"

  name         = "${local.application_name}-frontend-build"
  description  = "Build React project"
  service_role = aws_iam_role.codepipeline_role.arn

  environment_variables = {
    NODE_ENV = "production"
  }
  buildspec = "codebuild/buildspec_react_build.yml"
}

module "backend_validate" {
  source = "./modules/build_project"

  name         = "${local.application_name}-backend-validate"
  description  = "Validate Lambda project"
  service_role = aws_iam_role.codepipeline_role.arn

  environment_variables = {
    NODE_ENV = "test"
  }
  buildspec = "codebuild/buildspec_lambda_validate.yml"
}

module "backend_test" {
  source = "./modules/build_project"

  name         = "${local.application_name}-backend-test"
  description  = "Test Lambda project"
  service_role = aws_iam_role.codepipeline_role.arn

  environment_variables = {
    NODE_ENV = "test"
  }
  buildspec = "codebuild/buildspec_lambda_test.yml"
}

module "backend_build" {
  source = "./modules/build_project"

  name         = "${local.application_name}-backend-build"
  description  = "Build Lambda project"
  service_role = aws_iam_role.codepipeline_role.arn

  environment_variables = {
    NODE_ENV = "production"
  }
  buildspec = "codebuild/buildspec_lambda_build.yml"
}
