// Sequelize Import

import { Sequelize, Model, DataTypes, Optional, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyCountAssociationsMixin, HasManyHasAssociationMixin, HasManyCreateAssociationMixin, Association } from 'sequelize';
import { sequelize } from '../Server';

interface PostCommentAttributes {
    id: number;
    rating: number;
    content: string;
    belongsToPost: number;
}

interface PostCommentCreationAttributes extends Optional<PostCommentAttributes, "id"> {}

class PostCommentInstance extends Model<PostCommentAttributes, PostCommentCreationAttributes> implements PostCommentAttributes {
    public id!: number;
    public rating!: number;
    public content!: string;
    public belongsToPost!: number;
};

const PostComment = sequelize.define<PostCommentInstance>('PostComment', {
    id: {
        type: DataTypes.UUID,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true        
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: new DataTypes.STRING(1000),
        allowNull: false
    },
    belongsToPost: {
        type: DataTypes.INTEGER,
        allowNull: false    
    }
});

export { PostComment };