package com.kaoba.util;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class CloudinaryUtil {

    private final Cloudinary cloudinary;

    public CloudinaryUtil(@Value("${cloudinary.cloud.name}") String cloudName,
                         @Value("${cloudinary.api.key}") String apiKey,
                         @Value("${cloudinary.api.secret}") String apiSecret) {
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret
        ));
    }

    public String uploadImage(MultipartFile file) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap("folder", "kaoba/products"));
        return (String) uploadResult.get("secure_url");
    }

    public boolean deleteImage(String publicId) throws IOException {
        Map deleteResult = cloudinary.uploader().destroy(publicId, new HashMap<>());
        return "ok".equals(deleteResult.get("result"));
    }
}
