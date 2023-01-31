import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type DependeciesDocument = HydratedDocument<Dependecies>;

@Schema()
export class Dependecies {
    @Prop({default:false})
    deleted: boolean;

    @Prop({default: new Date()})
    created_at: Date;

    @Prop({ type: SchemaTypes.ObjectId })
    created_by: string;

    @Prop({default: new Date()})
    updated_at?: Date;
    
    @Prop({ type: SchemaTypes.ObjectId })
    updated_by?: string;

    @Prop()
    deleted_at?: Date;

    @Prop({ type: SchemaTypes.ObjectId })
    deleted_by?: string;
}
