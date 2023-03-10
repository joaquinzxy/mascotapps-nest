import { Cats } from 'src/cats/entities/cats.entity';
import { Dogs } from 'src/dogs/entities/dogs.entity';
import { Posts } from 'src/posts/entities/posts.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';


@Entity()
export class Users {

    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    role: string;

    @Column()
    password: string;

    @OneToMany(() => Posts, post => post.owner)
    posts: Posts[];

    @OneToMany(() => Dogs, (dog) => dog.id)
    dogs: Dogs[]

    @OneToMany(() => Cats, (cat) => cat.id)
    cats: Cats[]
}
