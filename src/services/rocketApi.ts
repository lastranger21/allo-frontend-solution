import type { rocket } from "@/types/rocket";

const API_URL = 'https://lldev.thespacedevs.com/2.2.0/config/launcher';

export async function getRocket():Promise<rocket[]>{
    const res = await fetch(`${API_URL}/?manufacturer__name=SpaceX&mode=detailed&limit=20`)
    if (!res.ok) {
    throw new Error(`Failed to fetch rockets (HTTP ${res.status})`);
  }
    const resJson = await res.json()


    return resJson.results ?? []
}
export async function getRocketById(id:number):Promise<rocket>{

    const res = await fetch(`${API_URL}/${id}/`)
    if (!res.ok) {
        throw new Error(`Failed to fetch rockets detail (HTTP ${res.status})`);
    }
    const resJson = await res.json()
    return resJson
}