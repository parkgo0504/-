import axios from "axios";
import { apiUrls, webStorages } from "../constants";
import urls from "../constants/urls";


export const signInApi = async (data) => {
    const response = await axios.post(urls.backEndApiUrls.signIn, data).catch(() => null);

    if (!response) return null;

    const result = response.data;
    return result;
}


export const signUpApi = async (data) => {
    const response = await axios.post(urls.backEndApiUrls.signUp, data).catch(() => null);

    if (!response) return null;

    const result = response.data;
    return result;
}


export const getBoardApi = async () => {
    try{
        const response = await axios.get(urls.backEndApiUrls.board, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(webStorages.token)}`
            }
        });

        const result = response.data;
        console.log(result);

        return result;

    } catch (e) {

        window.location.href = "/signin";
        alert("로그인 후 이용 바랍니다.");
        console.log("getBoardApi : 실패");
        return;

    }
}



/**
 * 
 * @param {string} userId 
 * @param {string} planTitle 
 * @returns 
 */
export const getPlanApi = async (userId, planTitle) => {
    try{
        const response = await axios.get(
            urls.backEndApiUrls.getPlan, {
                params: {"user_id": userId, "plan_title": planTitle},
                // TODO : 서버에서 Authorizatization 구현하면 작동하도록 할것
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem(webStorages.token)}`
                // }
            }
        );
        
        return response.data;
    } catch (e) {
        console.error(e);
        return;
    }
}

/**
 * 
 * @param {string} userId 
 * @returns {Array<string>}
 */
export const getPlanList = async (userId) => {
    try {
        const response = await axios.get(
            urls.backEndApiUrls.getPlanList, {
                params: {"user_id": userId}
            }
        )

        return (await response.data).map(item => item.plan_title);
    } catch (e) {
        console.error(e);
        return
    }
}

/**
 * 
 * @param {string} userId 
 * @param {string} title 
 */
export const deletePlan = async (userId, title) => {
    try {
        const response = await axios.get(
            urls.backEndApiUrls.deletePlan, {
                params: {
                    "user_id": userId,
                    "plan_title": title
                }
            }
        )
        return response;
    } catch (e) {
        console.error(e);
        return
    }
}