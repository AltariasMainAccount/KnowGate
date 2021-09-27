// CURRENTLY NOT NEEDED

// Sequelize Import

import { Sequelize, Model, DataTypes, Optional, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyCountAssociationsMixin, HasManyHasAssociationMixin, HasManyCreateAssociationMixin, Association } from 'sequelize';
import { sequelize } from '../Server';
import { Post } from './Post';

interface ProfileAttributes {
    id: number;
    name: string;
    password: string;
    email: string;
}

interface ProfileCreationAttributes extends Optional<ProfileAttributes, "id"> {}

class ProfileInstance extends Model<ProfileAttributes, ProfileCreationAttributes> implements ProfileAttributes {
    public id!: number;
    public name!: string;
    public password!: string;
    public email!: string;
};

const Profile = sequelize.define<ProfileInstance>('Profile', {
    id: {
        type: DataTypes.UUID,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true      
    },
    name: {
        type: new DataTypes.STRING(32),
        allowNull: false
    },
    password: {
        type: new DataTypes.STRING(128),
        allowNull: false
    },
    email: {
        type: new DataTypes.STRING(128),
        allowNull: false
    }
});

// Associations

Profile.hasMany(Post, { // A profile can have many posts
    sourceKey: 'id',
    foreignKey: 'post_creator',
    as: 'Posts'
})

Post.belongsTo(Profile, { // These posts belong to the profile
    foreignKey: 'post_creator',
    as: 'PostCreator'
})

export { Profile };