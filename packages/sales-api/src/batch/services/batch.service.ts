import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BatchRepository } from '../../repository/repositories/batch.repository';
import { LandRepository } from '../../repository/repositories/land.repository';
import { LandService } from '../../land/services/land.service';
import { Batch } from '../../repository/schemas/batch.schema';
import { PaginateResult } from '../../repository/interfaces/paginate-result.interface';
import { BatchDTO } from '../dtos/batch.dto';
import { isNil } from 'lodash';

@Injectable()
export class BatchService {
  constructor(
    private batchRepository: BatchRepository,
    private landRepository: LandRepository,
    private landService: LandService,
  ) {}

  /**
   * @name create
   * @param {object} batch Object batch to create
   * @description Creates a batch
   * @returns {Object} Returns the batch
   */
  async create(batch: BatchDTO): Promise<Batch> {
    const newBatch: Batch = {
      ...batch,
      created_by: '63d8b7c773867f515b7b8adb', //Until we know how to get the batchID
    };

    const batchCreated = await this.batchRepository.create(newBatch);
    if (!isNil(batchCreated.land_ids)) {
      await this.updateLand(newBatch._id, batchCreated.land_ids);
    }

    return batchCreated;
  }

  /**
   * @name findById
   * @param {string} batchId Id from the batch
   * @description Finds a batch with his ID
   * @returns {Object} Returns the batch found
   */
  async findById(batchId): Promise<Batch> {
    const batchFound = await this.batchRepository.findById(batchId);
    if (isNil(batchFound)) throw new NotFoundException('batch not found');
    if (batchFound.deleted) throw new NotFoundException('batch not found');
    return batchFound;
  }

  /**
   * @name findAll
   * @param {string} keyValue Value that we need to search
   * @param {number} skip Page of the paginate
   * @param  {number} limit Limit of the document result
   * @description Find all the batch paginated
   * @returns {PaginateResult} Object with the batch paginate
   */
  async findAll(
    keyValue = '',
    skip = 0,
    limit?: number,
  ): Promise<PaginateResult> {
    skip = Number(skip);
    limit = Number(limit);
    const options = {
      skip: skip > 0 ? skip - 1 : skip,
      limit,
    };

    //need to find the way of doing a variable search
    const query = {
      name: new RegExp(`${keyValue}`, 'i'),
    };

    const batchs = await this.batchRepository.find({ query, options });
    const countbatchs = await this.batchRepository.count(query);
    return {
      result: batchs,
      total: countbatchs,
      page: skip,
      pages: Math.ceil(countbatchs / limit),
    };
  }

  /**
   * @name update
   * @param {Object} batch Object batch to update
   * @description Update the batch
   * @returns {Object} Returns the batch updated
   */
  async update(batch, batchId): Promise<Batch> {
    const batchFound = await this.batchRepository.findById(batchId, {
      _id: 1,
      deleted: 1,
    });

    if (isNil(batchFound)) throw new NotFoundException('Batch not found');
    if (batchFound.deleted) throw new NotFoundException('Batch not found');

    batch._id = batchId;
    const batchUpdated = await this.batchRepository.updateOne(batch);
    if (!isNil(batchUpdated.land_ids)) {
      await this.updateLand(batchFound._id, batchUpdated.land_ids);
    }

    return batchUpdated;
  }

  /**
   * @name delete
   * @param {string} batchId Id from the batch
   * @description Deletes the batch but not remove from the DB
   * @returns {Object} Returns the result from the deletion
   */
  async delete(batchId): Promise<Batch> {
    const batch = await this.batchRepository.findById(batchId, {
      _id: 1,
      deleted: 1,
      land_ids: 1,
    });

    if (isNil(batch)) throw new NotFoundException('Batch not found');
    if (batch.deleted) throw new BadRequestException('Batch already deleted');

    if (!isNil(batch.land_ids)) {
      batch.land_ids.forEach((landId) => {
        this.landService.delete(landId);
      });
    }

    batch.deleted = true;
    batch.land_ids = [];
    return this.batchRepository.updateOne(batch);
  }

  /**
   * @name updateLand
   * @param {string} batchId
   * @param {string[]} land_ids
   * @description Update the land and his respective batches
   * @returns
   */
  async updateLand(batchId, land_ids: string[]): Promise<void> {
    const findOptiopns = {
      query: {
        _id: { $in: land_ids },
      },
      projection: {
        _id: 1,
        batch_id: 1,
        delete: 1,
      },
    };
    const landsFound = await this.landRepository.find(findOptiopns);

    for (let x = 0; x < landsFound.length; x++) {
      if (!isNil(landsFound[x].batch_id)) {
        await this.landService.deleteLandInBatch(
          landsFound[x].batch_id,
          landsFound[x]._id,
        );
      }
      landsFound[x].batch_id = batchId;
      await this.landRepository.updateOne(landsFound[x]);
    }
    return;
  }
}