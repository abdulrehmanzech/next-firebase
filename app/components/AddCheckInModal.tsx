import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../utils/firebase"; // Ensure you import Firebase Storage
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase storage functions

const AddCheckInModal = ({ open, handleClose }: any) => {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Handle file drop (for image upload)
  const onDrop = (acceptedFiles: File[]) => {
    setImageFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Submit logic with image upload to Firebase Storage
  const handleSubmit = async () => {
    if (!imageFile) {
      console.error("No image file selected");
      return;
    }

    setUploading(true); // Start uploading state

    // Create a reference to the storage location
    const storageRef = ref(storage, `checkins/${imageFile.name}`);

    // Upload the image to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optional: You can track progress here if needed
      },
      (error) => {
        console.error("Image upload failed:", error);
        setUploading(false);
      },
      () => {
        // Get the download URL and save it in Firestore
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            const docRef = await addDoc(collection(db, "checkins"), {
              title: title,
              image: downloadURL, // Save the Firebase Storage URL
              timestamp: new Date(),
            });
            console.log("Document written with ID: ", docRef.id);
            setUploading(false);
            handleClose(); // Close modal after submission
          } catch (e) {
            console.error("Error adding document: ", e);
            setUploading(false);
          }
        });
      }
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Add Check In
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ marginBottom: 4, marginTop: 4 }}>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            value={title}
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          {/* Upload Image Section */}
          <Box
            {...getRootProps()}
            sx={{
              border: "2px dashed grey",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
              borderRadius: 2,
              marginBottom: 2,
            }}
          >
            <input {...getInputProps()} />
            {imageFile ? (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Uploaded"
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
            ) : (
              <>
                <Typography variant="body1">
                  Click or drag file to this area to upload
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Support for a single or bulk upload.
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          disabled={uploading}
          style={{ borderRadius: 6 }}
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          {uploading ? "Uploading..." : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCheckInModal;
