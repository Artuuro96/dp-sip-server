import { Prop, Schema } from '@nestjs/mongoose';
import { IsNumber, Min, IsOptional, IsString, IsNotEmpty, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type BaseDocument = HydratedDocument<Base>;

@Schema()
export class Base {
    @Prop({default:false})
    deleted?: boolean;

    @Prop({default: new Date()})
    created_at?: Date;

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

    /*constructor(base:Partial<Base>) {
        Object.assign(this, base)
    }*/
}