export interface RoomType {
  roomTypeId: string;
  type: string;
  name: string;
  cost: number;
  shortDescription: string;
  longDescription?: string;
  description?: string;
  max_occupancy: number;
  total_rooms: number;
  image: string;
}
