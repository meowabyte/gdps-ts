import { DataTypes, Model } from "sequelize";
import { sql } from "./sql";

export default class ProfileComments extends Model {
    declare id: number;
    declare accountId: number;
    declare comment: string;
    declare likes: number;
}

ProfileComments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        accountId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 1,
                max: 200,
            },
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    { sequelize: sql }
);
