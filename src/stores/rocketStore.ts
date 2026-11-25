import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { rocket, NewRocketPayload } from '@/types/rocket';
import { getRocket, getRocketById } from '@/services/rocketApi';

export const useRocketStore=defineStore('rockets',()=>{
    const rockets = ref<rocket[]>([]);
    const searchQuery = ref('')
    const isLoading = ref(false);
    const error = ref<string | null>(null);
    const hasFetched = ref(false);
    const filteredRockets = computed(()=>{
        const query = searchQuery.value.trim().toLowerCase()
        if(!query)return rockets.value;
        return rockets.value.filter((rocket)=> 
            rocket.full_name?.toLowerCase().includes(query)||
        (rocket.description && rocket.description.toLowerCase().includes(query))
        )
    })
    async function loadRockets(force=false){
        if(hasFetched.value && !force)return

        isLoading.value =true
        error.value = null
        
        try {
            const apiRockets = await getRocket()
            const customRockets = rockets.value.filter((r)=>r.isCustom)
            rockets.value = [...customRockets, ...apiRockets];
            hasFetched.value = true;
        } catch (error:any) {
            error.value = error instanceof Error ? error.message : 'An unexpected error occurred while loading rockets.';
        }finally{
            isLoading.value = false;
        }
    }
    function addNewRocket(payload:NewRocketPayload){
        const newRocket:rocket = {
            id:Date.now(),
            full_name: payload.full_name.trim(),
            description: payload.description.trim() || null,
            image_url: payload.image_url.trim() || null,
            launch_cost: payload.launch_cost,
            maiden_flight: payload.maiden_flight || null,
            manufacturer: {
                    name: 'SpaceX (Custom)',
                    country_code: payload.country_code.trim().toUpperCase() || 'USA',
                    },
            isCustom: true,
        };
        rockets.value.unshift(newRocket);
    }
    async function getRocketDetail(id: number): Promise<rocket> {
    
    const existing = rockets.value.find((r) => r.id === id);
    if (existing) {
      return existing;
    }
    return await getRocketById(id);
  }

  return {
    rockets,
    searchQuery,
    isLoading,
    error,
    filteredRockets,
    loadRockets,
    addNewRocket,
    getRocketDetail,
  };

})