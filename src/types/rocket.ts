export interface rocket{
id:number,
image_url:string|null,
full_name:string|null,
description:string|null,
launch_cost:number|null,
manufacturer?: {
    name?: string;
    country_code?: string | null;
  } | null;
maiden_flight:string|null
isCustom?:boolean
}
export interface NewRocketPayload {
  full_name: string;
  description: string;
  image_url: string;
  launch_cost: number | null;
  country_code: string;
  maiden_flight: string;
}