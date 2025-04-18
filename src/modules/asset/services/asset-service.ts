import { GenericService } from "@/lib/react-query/services/generic-service";
import { AssetRequestDto, AssetResponseDto } from "../models/asset-model";
import { Paginated } from "@/models/paginated-interface";

class AssetService extends GenericService<AssetRequestDto, AssetResponseDto, Paginated<AssetResponseDto>> {
  constructor() {
    super("/assets");
  }
}

export const assetService = new AssetService();
