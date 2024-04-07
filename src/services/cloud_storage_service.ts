import supabase from "@/utils/supabase-client";

class CloudStorageService {
  constructor() {}

  async uploadFile(file: File, bucketName: string): Promise<string | null> {
    try {
      const {data, error} = await supabase.storage
        .from(bucketName)
        .upload(`public/${file.name}`, file);

      if (error) {
        console.error("Error uploading file:", error.message);
        return null;
      }
      if (data == null) {
        console.error("Error uploading file: no data returned");
        return null;
      }

      console.log("File uploaded successfully:", data);
      return data.path;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  }
}

export default CloudStorageService;
