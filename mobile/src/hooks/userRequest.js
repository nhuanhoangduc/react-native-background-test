import React, { useState, useEffect } from 'react';
import baseApi from '@mobile/api/baseApi';


export const usePost = (endpoint) => {
    const [state, setState] = useState({
        loading: false,
        error: null,
        response: null,
    });

    const request = async (data) => {
        setState({
            loading: true,
            error: null,
            response: null,
        });

        try {
            const response = await baseApi.POST(endpoint, data);
            setState({
                loading: false,
                error: null,
                response: response,
            });
        } catch (error) {
            setState({
                loading: false,
                error: error,
                response: null,
            });
        }
    }

    return {
        request: request,
        loading: state.loading,
        error: state.error,
        response: state.response,
    };
};
