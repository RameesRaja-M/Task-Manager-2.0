import { API_PATHS } from "./apiPaths"
import axiosInstence from "./axiosInstance"

const uploadImage = async (imageFile) => {
    const formData = new FormData()

    // Append Image
    formData.append('image', imageFile)

    try {
        const response = await axiosInstence.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    } catch (error) {
        console.error("Error Uploading Image", error);
        throw error
    }
}

export default uploadImage