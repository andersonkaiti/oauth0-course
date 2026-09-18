import type { IUser } from '@domain/entities/users.entity.ts'
import type { IUsersRepository } from '@domain/repositories/users.repository.ts'
import { eq } from 'drizzle-orm'
import { db } from '../drizzle/index.ts'
import { usersTable } from '../drizzle/schemas/user.ts'

export class UsersRepository implements IUsersRepository {
  async upsert({
    first_name,
    last_name,
    avatar,
    email,
    google_id,
  }: Omit<IUser, 'id'>): Promise<IUser> {
    const [user] = await db
      .insert(usersTable)
      .values({
        first_name,
        last_name,
        avatar,
        email,
        google_id,
      })
      .onConflictDoUpdate({
        target: usersTable.email,
        set: {
          first_name,
          last_name,
          avatar,
          email,
          google_id,
        },
      })
      .returning()

    return user
  }

  async getUserById(id: IUser['id']): Promise<IUser> {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))

    return user
  }
}
