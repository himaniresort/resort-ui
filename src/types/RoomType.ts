export interface RoomType {
  roomTypeId: string;
  type: string;
  type_code: string;
  name: string;
  cost: number;
  shortDescription: string;
  longDescription?: string;
  description?: string;
  max_occupancy: number;
  total_rooms: number;
  image: string;
}
