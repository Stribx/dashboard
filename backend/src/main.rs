use axum::{
    routing::get,
    Router, Extension,
};
use sqlx::postgres::PgPoolOptions;
use std::fs;
use anyhow::{Context, Ok};

mod models;
mod controllers;
mod fixtures;

#[tokio::main]
async fn main() -> anyhow::Result<()> {

    let env = fs::read_to_string(".env").unwrap();
    let (key, database_url) = env.split_once('=').unwrap();

    assert_eq!(key, "DATABASE_URL");

    let pool = PgPoolOptions::new()
        .max_connections(50)
        .connect(&database_url)
        .await
        .context("could not connect to database_url")?;

    sqlx::migrate!("./migrations").run(&pool).await?;

    fixtures::generate_fixtures(&pool).await;

    let app = Router::new()
        .route("/task", get(controllers::tasks::all_tasks))
        .route("/task/:id", get(controllers::tasks::tasks_by_id).post(controllers::tasks::tasks_edit_by_id))
        .layer(Extension(pool));
    
    axum::Server::bind(&"127.0.0.1:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await?;
        
    Ok(())
}