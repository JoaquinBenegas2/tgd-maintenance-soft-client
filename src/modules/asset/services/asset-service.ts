import { GenericService } from "@/lib/react-query/services/generic-service";
import { AssetRequestDto, AssetResponseDto } from "../models/asset-model";
import { Paginated } from "@/models/paginated-interface";
import { axiosRequest } from "@/lib/axios/config/axios-config";

class AssetService extends GenericService<
  AssetRequestDto,
  AssetResponseDto,
  Paginated<AssetResponseDto>
> {
  constructor() {
    super("/assets");
  }

  updateStatus = async (
    id: number | string,
    status: "ACTIVE" | "INACTIVE"
  ): Promise<AssetResponseDto> => {
    return await axiosRequest.put(`${this.baseUrl}/${id}/status`, null, {
      params: { status },
    });
  };
}

export const assetService = new AssetService();
