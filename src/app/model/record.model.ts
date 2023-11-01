export interface RecordModel {
  id: number | undefined;
  category: number;
  title: string;
  recordDate: Date;
  lastUpdate: Date | undefined;
}
