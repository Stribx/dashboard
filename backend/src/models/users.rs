use serde::{Deserialize, Serialize};

#[derive(Debug, sqlx::FromRow, Deserialize, Serialize)]
pub struct Users {
    pub id: i32,
    pub pseudo: String,
    pub password: String,
    pub roles: Vec<String>,
}

#[derive(Debug, sqlx::FromRow, Deserialize, Serialize)]
pub struct NewUsers {
    pub pseudo: String,
    pub password: String,
    pub roles: Vec<String>,
}