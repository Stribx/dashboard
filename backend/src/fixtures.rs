use sqlx::PgPool;

pub mod users;
pub mod tasks;

pub async fn generate_fixtures(pool: &PgPool){
    users::fixtures_users(pool).await.unwrap();
    tasks::fixtures_tasks(pool).await.unwrap();
}