/* eslint-disable @typescript-eslint/no-explicit-any */
import { Entity, PrimaryColumn, Generated } from 'typeorm';

@Entity({
  name: 'transaction',
})
export default class Transaction {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string;
}
