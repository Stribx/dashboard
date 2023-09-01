/* use sqlx::PgPool;
use axum::response::Html;
use axum::http::StatusCode;
use anyhow::Result;

use crate::models::users;

pub async fn login(pool: &PgPool, form: axum::extract::Form<users::NewUsers>) -> Result<Html<String>, StatusCode> {
    let form = form.0;

    let user = sqlx::query!(
        "SELECT * FROM users WHERE pseudo = $1 AND password = $2 ",
        form.pseudo,
        form.password,
    )
    .fetch_one(pool)
    .await?;

    Ok(Html(format!("Logged in: {}", user.pseudo)))
}*/