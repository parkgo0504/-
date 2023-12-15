const ApiUrlBase = "https://deploytest-s26rn5fmbq-du.a.run.app/api";
const aiApiUrlBase = "https://fastapi-service-s26rn5fmbq-du.a.run.app";


const backEndApiUrls = {
    // 백엔드 api에 연결하기 위한 URL 추가
    root: ApiUrlBase,
    board: ApiUrlBase + "/board/",
    signIn: ApiUrlBase + "/auth/signIn",
    signUp: ApiUrlBase + "/auth/signUp",
    addLocation: ApiUrlBase + "/location/add",
    getPlan: ApiUrlBase + "/plan/select",
    /**
     * 
     * @param {string} id 
     */
    getFavoriteById: (id) => (
        ApiUrlBase + "/favorite/select?user_id=" + id
    ),
    getPlanList: ApiUrlBase + "/plan/oneselect",
    savePlanList: ApiUrlBase + "/plan/save",
    saveFavorite: ApiUrlBase + "/favorite/save",
    deletePlan: ApiUrlBase + "/plan/delete"
}

const aiApiUrls = {
        // AI 서버에 연결하기 위한 URL 추가
    /**
     * @param {string} id 
     */
    favoriteViewById: (id) => (
        aiApiUrlBase + "/favorite/view/" + id
    ),
    /**
     * 
     * @param {string} id 
     * @param {number} fav_num 
     * @returns 
     */
    favoriteSorted: (id,fav_num) => (
        aiApiUrlBase + "/favorite/sorted/" + id +"/"+fav_num
    ),
    getResponse: aiApiUrlBase + "/get-response",
   // favoriteView: aiApiUrlBase+ "/favorite/view?user_id=" + id
}

export default {backEndApiUrls, aiApiUrls};