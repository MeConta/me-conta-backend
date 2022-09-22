resource "google_cloud_run_service" "me-conta-frontend" {
  name     = "me-conta-frontend"
  location = "us-central1"

  template {
    spec {
      containers {
        image = "us-central1-docker.pkg.dev/me-conta-hml-ca34/me-conta/me-conta-frontend:latest"
          env {
            name = "NODE_ENV"
            value = "production"
          }
          env {
            name = "NEXT_PUBLIC_API_URL"
            value = "https://me-conta-backend-32pwnm2mlq-uc.a.run.app	"
          }
      }
    }
  }
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location    = google_cloud_run_service.me-conta-frontend.location
  project     = google_cloud_run_service.me-conta-frontend.project
  service     = google_cloud_run_service.me-conta-frontend.name
  policy_data = data.google_iam_policy.noauth.policy_data
}