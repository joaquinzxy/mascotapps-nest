// Generated by https://quicktype.io

import { Users } from "src/users/entities/users.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Posts {

    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column()
    category: string;

    @Column({ nullable: true })
    image?: string;

    
    @ManyToOne(() => Users, (user) => user.posts, { onDelete: 'CASCADE', eager: true })
    @JoinTable()
    owner: string
}
