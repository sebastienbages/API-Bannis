import {
    Column,
    Entity,
    EntityRepository,
    PrimaryGeneratedColumn,
    Repository,
} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({unique: true})
    public email!: string;

    @Column()
    public password!: string;
}

@EntityRepository(User)
export class UserRepository extends Repository<User> {}