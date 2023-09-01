use sqlx::PgPool;

use crate::models::users::NewUsers;

pub async fn fixtures_users(pool: &PgPool) -> sqlx::Result<()> {

    reset_table(pool).await?;

    let fixtures: Vec<NewUsers> = vec![NewUsers {
        pseudo: "test1".to_string(),
        password: "test1".to_string(),
        roles: vec!["user".to_string()],
    }];

    for user in fixtures {
        sqlx::query!(
            "INSERT INTO users (pseudo, password, roles) VALUES ($1, $2, $3)",
            user.pseudo,
            user.password,
            &user.roles,
        )
        .execute(pool)
        .await?;
    }

    Ok(())
}

async fn reset_table(pool: &PgPool) -> sqlx::Result<()>{
    sqlx::query!("ALTER TABLE users DISABLE TRIGGER ALL")
        .execute(pool)
        .await?;

    sqlx::query!("TRUNCATE users CASCADE")
        .execute(pool)
        .await?;

    sqlx::query!("ALTER SEQUENCE users_id_seq RESTART WITH 1")
        .execute(pool)
        .await?;

    Ok(())
}
