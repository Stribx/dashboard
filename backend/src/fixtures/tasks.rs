use sqlx::PgPool;
use chrono::NaiveTime;

use crate::models::tasks::NewTask;

pub async fn fixtures_tasks(pool: &PgPool) -> sqlx::Result<()> {

    reset_table(pool).await?;

    let fixtures: Vec<NewTask> = vec![
        NewTask {
            user_id: 1,
            title: "Task Title".to_string(),
            description: "Task Description".to_string(),
            duration: NaiveTime::from_hms_opt(10, 5, 5),
            status: "on going".to_string(),
        },
    ];
    for task in fixtures{
        sqlx::query!(
            "INSERT INTO tasks (user_id, title, description, duration, status) VALUES ($1, $2, $3, $4, $5)",
            task.user_id,
            task.title,
            task.description,
            task.duration,
            task.status,
        )
        .execute(pool)
        .await?;
    }

    Ok(())
}

async fn reset_table(pool: &PgPool) -> sqlx::Result<()>{
    sqlx::query!("ALTER TABLE tasks DISABLE TRIGGER ALL")
        .execute(pool)
        .await?;

    sqlx::query!("TRUNCATE tasks RESTART IDENTITY")
        .execute(pool)
        .await?;

    Ok(())
}