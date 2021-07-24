import {IsDefined, IsEmail, validateOrReject} from "class-validator";
import {
    BeforeInsert, BeforeUpdate,
    Column,
    Entity,
    EntityRepository,
    PrimaryGeneratedColumn,
    Repository,
} from "typeorm";
import {hashPassword} from "../utils/password.utils";

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
    hashedPassword: string;

    set password(password) {
        if (password) {
            this.hashedPassword = hashPassword(password, process.env.HASH_SALT);
        }
    }

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        await validateOrReject(this);
    }
}

@EntityRepository(User)
export class UserRepository extends Repository<User> {}