import {IsDefined, IsEmail, validateOrReject} from "class-validator";
import {
    BeforeInsert, BeforeUpdate,
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

    @IsDefined()
    @IsEmail()
    @Column({unique: true})
    public email!: string;

    @IsDefined()
    @Column()
    public password!: string;

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        await validateOrReject(this);
    }
}

@EntityRepository(User)
export class UserRepository extends Repository<User> {}