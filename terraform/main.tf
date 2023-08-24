provider "aws" {
  region = "us-east-1"  # Cambia esto a tu región preferida
}

resource "aws_codecommit_repository" "my_repo" {
  repository_name = "my-repo"  # Cambia esto al nombre que desees para tu repositorio
  description     = "Mi repositorio de CodeCommit"
}

output "repository_clone_url_http" {
  value = aws_codecommit_repository.my_repo.clone_url_http
}

output "repository_clone_url_ssh" {
  value = aws_codecommit_repository.my_repo.clone_url_ssh
}
