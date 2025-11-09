resource "aws_s3_bucket" "artifacts" {
  bucket = "${local.application_name}-artifacts"
}
