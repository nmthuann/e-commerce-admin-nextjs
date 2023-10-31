import useAxiosFunction from "../../hooks/use-axios-function";

import httpClient from "../../lib/axios-instance";

const loginUrl = '/auth/admin/login'

export const LoginApi = () => {
    const { 
        response: loginResponse,
        error: loginError,
        loading: loginIsLoading,
        axiosFetch: loginRefetch 
    } = useAxiosFunction();

    const callLoginRefetch = (dataUser: any) => {
        loginRefetch({
            axiosInstance: httpClient,
            method: 'POST',
            url: loginUrl,
            requestConfig: {data: dataUser}
        })
    }  


    return { loginResponse, loginIsLoading, loginError, callLoginRefetch }
}

