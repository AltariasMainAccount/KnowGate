// Sequelize Import

import { Sequelize, Model, DataTypes, Optional, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyCountAssociationsMixin, HasManyHasAssociationMixin, HasManyCreateAssociationMixin, Association } from 'sequelize';
import { PostComment } from './PostComment';
import { sequelize } from '../Server';

interface PostAttributes {
    id: number;
    post_creator: number;
    post_title: string;
    post_content: string;
    post_repository: string;
}

interface PostCreationAttributes extends Optional<PostAttributes, "id"> {}

class PostInstance extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
    public id!: number;
    public post_creator!: number;
    public post_title!: string;
    public post_content!: string;
    public post_repository!: string;       
};

const Post = sequelize.define<PostInstance>('Post', {
    id: {
        type: DataTypes.UUID,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true      
    },
    post_creator: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    post_title: {
        type: new DataTypes.STRING(64),
        allowNull: false
    },
    post_content: {
        type: new DataTypes.STRING(1000),
        allowNull: false
    },
    post_repository: {
        type: new DataTypes.STRING(128),
        allowNull: false
    }
});

// Associations

Post.hasMany(PostComment, { // Each Post can have many anonymous comments
    sourceKey: 'id',
    foreignKey: 'belongsToPost',
    as: 'Comments'    
})

PostComment.belongsTo(Post, { // The anonymous comments belong to the post
    foreignKey: 'belongsToPost',
    as: 'Post'
})

export { Post };