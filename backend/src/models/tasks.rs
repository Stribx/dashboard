use serde::{Deserialize, Serialize};
use chrono::{NaiveDateTime, NaiveTime};

#[derive(Debug, sqlx::FromRow, Deserialize, Serialize)]
pub struct Task {
    pub id: i32,
    pub user_id: i32,
    pub title: String,
    pub description: String,
    pub duration: Option<NaiveTime>,
    pub created_at: NaiveDateTime,
    pub status: String,
}

#[derive(Debug, sqlx::FromRow, Deserialize, Serialize)]
pub struct NewTask {
    pub user_id: i32,
    pub title: String,
    pub description: String,
    pub duration: Option<NaiveTime>,
    pub status: String,
}