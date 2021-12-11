/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRepository } from 'typeorm';
import Transaction from '../db/models/transaction';
import { InternalError, NotFoundException } from '../utils/error';

class TransactionService {
  private getRepository() {
    return getRepository(Transaction);
  }
  async insertDb(tx: Transaction) {
    try {
      await this.getRepository().insert(tx);
      return { id: tx.id };
    } catch (e) {
      console.error(e);
      throw InternalError('Internal error, try again later');
    }
  }

  async getTransactions({ limit, offset }: { limit: number; offset: number }) {
    if (limit > 100) limit = 100;
    const txs = await this.getRepository().find({
      skip: offset || 0,
      take: limit,
    });
    const result = [];
    for (const tx of txs) {
      result.push({ ...tx, data: undefined, updatedAt: undefined });
      Object.keys(result).forEach((key) => {
        if (result[key] == null) {
          delete result[key];
        }
      });
    }
    return result;
  }
  async getTransactionById(transactionId: string) {
    const tx = await this.getRepository().findOne(transactionId);
    if (!tx) {
      throw NotFoundException('Transaction not found');
    }
    return tx;
  }
  async updateTransactionById(transactionId: string, updateBody: any) {
    const tx = await this.getRepository().findOne(transactionId);
    if (!tx) {
      throw NotFoundException('Transaction not found');
    }
    const result = await this.getRepository().update(transactionId, updateBody);
    if (result.affected !== 1) {
      throw InternalError('Could not update error, try again later');
    }
    return { id: transactionId };
  }
  async deleteTransactionById(transactionId: string) {
    const tx = await this.getRepository().findOne(transactionId);
    if (!tx) {
      throw NotFoundException('Transaction not found');
    }
    const result = await this.getRepository().delete(transactionId);
    if (result.affected !== 1) {
      throw InternalError('Could not update error, try again later');
    }
    return { id: transactionId };
  }
}
export default new TransactionService();
