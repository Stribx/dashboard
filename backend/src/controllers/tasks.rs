use axum::{ response::{IntoResponse, Json}, 
            http::StatusCode,
            extract::{Path, Extension}
        };
use serde_json::json;
use sqlx::PgPool;
use crate::models::tasks;

pub async fn all_tasks(Extension(pool): Extension<PgPool>) -> impl IntoResponse {
    let sql = "SELECT * FROM tasks ".to_string();

    let tasks = sqlx::query_as::<_, tasks::Task>(&sql).fetch_all(&pool).await.unwrap();

    (StatusCode::OK, Json(tasks))
}

pub async fn tasks_by_id(Path(task_id): Path<i32>, Extension(pool): Extension<PgPool>) -> impl IntoResponse {
    let sql = format!("SELECT * FROM tasks WHERE id = {}", task_id);

    let tasks = sqlx::query_as::<_, tasks::Task>(&sql).fetch_one(&pool).await.unwrap();

    (StatusCode::OK, Json(tasks))
}

pub async fn tasks_edit_by_id(Path(task_id): Path<i32>, Extension(pool): Extension<PgPool>, axum::extract::Json(task): axum::extract::Json<tasks::Task>) -> impl IntoResponse {
    sqlx::query!(
        "UPDATE tasks SET description = $1, duration = $2, status = $3 WHERE id = $4",
        task.description,
        task.duration,
        task.status,
        task_id
    )
    .execute(&pool)
    .await.unwrap();

    (StatusCode::OK, Json(json!({"success": true})))
}