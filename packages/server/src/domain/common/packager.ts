export class Packager {
  getPageCount(batchSize: number, totalRecords: number): number {
    if (totalRecords > 0) {
      if (totalRecords < batchSize) {
        return 1;
      }
      return Math.floor(totalRecords / batchSize) + (totalRecords % batchSize);
    }
    return 0;
  }
}
