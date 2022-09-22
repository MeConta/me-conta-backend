resource "google_artifact_registry_repository" "me-conta" {
  location      = "us-central1"
  repository_id = "me-conta"
  description   = ""
  format        = "DOCKER"
}