import axios from "axios";
import sizeOf from "image-size";

const validateImageUrl = async (
    url,
    allowedTypes = ["jpg", "jpeg", "png", "gif"],
    maxWidth = 1920,
    maxHeight = 1240
) => {
    try {
        // Kiểm tra loại tệp (type)
        const fileType = url.substring(url.lastIndexOf(".") + 1).toLowerCase();
        if (!allowedTypes.includes(fileType)) {
            throw new Error("Invalid image type");
        }
        // Tải hình ảnh và kiểm tra kích thước
        const response = await axios.get(url, { responseType: "arraybuffer" });
        const buffer = Buffer.from(response.data, "binary");

        const dimensions = sizeOf(buffer);

        if (dimensions.width <= maxWidth && dimensions.height <= maxHeight) {
            return "Image is valid";
        } else {
            throw new Error("Image dimensions are too large");
        }
    } catch (error) {
        throw error;
    }
};

export default validateImageUrl;
