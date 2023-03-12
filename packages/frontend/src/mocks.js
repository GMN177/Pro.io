
const waitFor = async (response, milliseconds) => {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(response)
        }, milliseconds)
    })
}

const mockAPI = async (params) => {
    return await waitFor(params, 2000);
}

export const mocks = {
    mockAPI
}
