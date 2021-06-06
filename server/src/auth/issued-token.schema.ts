import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type IssuedTokenDocument = IssuedToken & Document;

@Schema()
export class IssuedToken {
  @Prop({ required: true, unique: true })
  accessToken: string;

  @Prop({ required: true })
  userId: number;
}

export const IssuedTokenSchema = SchemaFactory.createForClass(IssuedToken);
