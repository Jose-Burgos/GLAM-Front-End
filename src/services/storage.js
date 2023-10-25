// todos los servicios para packets y objetos

import { supabase } from '../api/config';

// List all buckets from supabase (servicio para listar buckets)
export const listBuckets = async () => {
  try {
    const { data, error } = await supabase.storage.listBuckets();
    if (error) throw new Error('No buckets found');
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Funcion para crear buckets, no creo que la usemos pero es para testear cosas
export const createBucket = async ({ bucketName, isPublic }) => {
  try {
    const { data, error } = await supabase.storage.createBucket(bucketName, {
      public: isPublic,
    });
    if (error) throw new Error('An error ocurred while creating the bucket');
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Bucket getter
export const getBucketDetails = async (bucketName) => {
  try {
    const { data, error } = await supabase.storage.getBucket(bucketName);
    if (error) throw new Error('No bucket found');
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const listFilesFromBucket = async (bucketName) => {
  try {
    const { data, error } = await supabase.storage.from(bucketName).list(); // Use `bucketName` here
    if (error) throw new Error('No files found');
    return data;
  } catch (error) {
    console.error(error);
  }
};

// upload files to a bucket
export const uploadFileToBucket = async (bucketId, path, file) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucketId)
      .upload(path, file);
    if (error) throw new Error('No files found');
    return data;
  } catch (error) {
    console.error(error);
  }
};


// Download file
export const downloadFileFromBucket = async (bucket, path) => {
  try {
    const { data, error } = await supabase.storage.from(bucket).download(path);
    if (error) throw new Error('Error downloading file');
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Define a function to create an empty file
export const createEmptyFile = async (bucketId, path, mimeType, size) => {
  // four parameters (id of Bucket, path of the file to be created, tipo de archivo (image/jpeg para imagenes), tamaño en bytes)
  try {
    if (!path) {
      throw new Error('Invalid path specified for the file.');
    }

    if (!mimeType) {
      throw new Error('Invalid MIME type specified for the file.');
    }

    if (!size || size <= 0) {
      throw new Error('Invalid file size specified.');
    }

    // Create an empty Blob with the specified MIME type and size
    const emptyBlob = new Blob([], {
      type: mimeType,
      endings: 'transparent',
      size,
    });

    // Upload the empty file to the specified bucket and path
    const result = await uploadFileToBucket(bucketId, path, emptyBlob);
    console.log('Empty file created and uploaded successfully:', result);

    return result;
  } catch (error) {
    console.error('Error creating and uploading empty file:', error);
    throw error;
  }
};

async function uploadImage(e) {
    let file = e.target.files[0];

    const { data, error } = await supabase
        .storage
        .from('animal-pictures-orgs')
        .upload(user.id + "/" + uuidv4(), file)

        if(data) {
            getImages();
        } else {
            console.log('Error')        // no me acuerdo como manejamos los errores
        }
}

async function getImages() {
    const { data, error } = await supabase
        .storage
        .from('animal-pictures-orgs')
        .list(user?.id + "/", {
            limit: 20,
            offset: 0,
            sortBy: {column: "name", order: "asc"}          // fijarme de cambiarlo a orden de insercion
        });

        if(data !== null){
            setImages(data);
        } else{
            console.log(error);
        }
}



