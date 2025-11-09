resource "aws_codepipeline" "pipeline" {
  name     = "${local.application_name}-ci-pipeline"
  role_arn = aws_iam_role.codepipeline_role.arn

  artifact_store {
    location = aws_s3_bucket.artifacts.bucket
    type     = "S3"
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "AWS"
      provider         = "CodeStarSourceConnection"
      version          = "1"
      output_artifacts = ["source_output"]

      configuration = {
        ConnectionArn    = var.code_connection
        FullRepositoryId = local.repository_id
        BranchName       = "main"
        DetectChanges    = "true"
      }
    }
  }

  stage {
    name = "Test"

    action {
      name             = "Validate"
      category         = "Test"
      owner            = "AWS"
      provider         = "CodeBuild"
      input_artifacts  = ["source_output"]
      output_artifacts = []
      version          = "1"

      configuration = {
        ProjectName = aws_codebuild_project.frontend_validate.name
      }
    }
    action {
      name             = "Test"
      category         = "Test"
      owner            = "AWS"
      provider         = "CodeBuild"
      input_artifacts  = ["source_output"]
      output_artifacts = []
      version          = "1"

      configuration = {
        ProjectName = aws_codebuild_project.frontend_test.name
      }
    }
  }

  stage {
    name = "Build"

    action {
      name             = "Build"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      input_artifacts  = ["source_output"]
      output_artifacts = ["build_output"]
      version          = "1"

      configuration = {
        ProjectName = aws_codebuild_project.frontend_build.name
      }
    }
  }
}