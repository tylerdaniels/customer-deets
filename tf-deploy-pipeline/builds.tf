resource "aws_codebuild_project" "frontend_validate" {
  name         = "${local.application_name}-frontend-validate"
  description  = "Validate JavaScript project"
  service_role = aws_iam_role.codepipeline_role.arn

  artifacts {
    type = "CODEPIPELINE"
  }

  environment {
    compute_type = "BUILD_GENERAL1_SMALL"
    image        = "aws/codebuild/standard:7.0"
    type         = "LINUX_CONTAINER"

    environment_variable {
      name  = "NODE_ENV"
      value = "test"
    }
  }

  source {
    type      = "CODEPIPELINE"
    buildspec = "codebuild/buildspec_react_validate.yml"
  }
}

resource "aws_codebuild_project" "frontend_test" {
  name         = "${local.application_name}-frontend-test"
  description  = "Test JavaScript project"
  service_role = aws_iam_role.codepipeline_role.arn

  artifacts {
    type = "CODEPIPELINE"
  }

  environment {
    compute_type = "BUILD_GENERAL1_SMALL"
    image        = "aws/codebuild/standard:7.0"
    type         = "LINUX_CONTAINER"

    environment_variable {
      name  = "NODE_ENV"
      value = "test"
    }
  }

  source {
    type      = "CODEPIPELINE"
    buildspec = "codebuild/buildspec_react_test.yml"
  }
}

resource "aws_codebuild_project" "frontend_build" {
  name         = "${local.application_name}-frontend-build"
  description  = "Build JavaScript project"
  service_role = aws_iam_role.codepipeline_role.arn

  artifacts {
    type = "CODEPIPELINE"
  }

  environment {
    compute_type = "BUILD_GENERAL1_SMALL"
    image        = "aws/codebuild/standard:7.0"
    type         = "LINUX_CONTAINER"

    environment_variable {
      name  = "NODE_ENV"
      value = "production"
    }
  }

  source {
    type      = "CODEPIPELINE"
    buildspec = "codebuild/buildspec_react_build.yml"
  }
}