"use client";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { useEffect, useState } from "react";
import AddCheckInModal from "./components/AddCheckInModal";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./utils/firebase";

export default function Home() {
  const checkins = [
    {
      id: 1,
      name: "CheckIn Name",
      date: "12th Nov, 2022",
      owner: "John Doe",
      image: "/assets/1.jpg", // Random travel images
    },
    {
      id: 1,
      name: "CheckIn Name",
      date: "12th Nov, 2022",
      owner: "John Doe",
      image: "/assets/2.jpg", // Random travel images
    },
    {
      id: 1,
      name: "CheckIn Name",
      date: "12th Nov, 2022",
      owner: "John Doe",
      image: "/assets/3.jpg", // Random travel images
    },
    {
      id: 1,
      name: "CheckIn Name",
      date: "12th Nov, 2022",
      owner: "John Doe",
      image: "/assets/4.jpg", // Random travel images
    },
    // Add more check-ins as needed
  ];
  const [checkinss, setCheckins] = useState<any[]>([]);

  const [openModal, setOpenModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const handleOpenModal = () => setOpenModal(true);
const [imageUrl, setImageUrl] = useState<any>();
  const handleCloseModal = () => setOpenModal(false);
  useEffect(() => {
    const fetchCheckIns = async () => {
      const querySnapshot = await getDocs(collection(db, "checkins"));
      const checkInData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCheckins(checkInData);
    };

    fetchCheckIns();
  }, []);
  console.log(checkinss,"checkinsscheckinss")

  return (
    <Box>
      {/* AppBar with logo, feedback, notifications, avatar */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Logo
          </Typography>
          <Button
            sx={{
              borderRadius: 6,
              paddingX: 3,
              backgroundColor: "rgb(156, 39, 176)",
              color: "white",
            }}
          >
            Feedback
          </Button>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <Avatar src="/path-to-placeholder-avatar" />
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          marginX: 3,
        }}
      >
        <Box
          sx={{
            backgroundImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)), url(/assets/bannerbg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            padding: 4,
            borderRadius: 6,
            marginY: 3,
          }}
        >
          <Typography variant="h3">Hi! 👋 James Doe</Typography>
          <Typography variant="body1" gutterBottom>
            Lorem ipsum dolor sit amet, something important to say here.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Add Check In
          </Button>
        </Box>

        {/* Added CheckIns */}
        <Typography variant="h5" sx={{ marginBottom: 3 }}>
          Added CheckIns
        </Typography>
        <Grid container sx={{ marginBottom: 3 }} spacing={3}>
        {checkinss.map((checkin:any) => {
  // Convert Firestore timestamp to Date
  console.log(checkin,"dkdkd")
  const date = new Date(checkin?.timestamp?.seconds * 1000);
  const formattedDate = date.toLocaleDateString(); // Format the date to your preference
  return (
    <Grid item xs={12} sm={6} md={3} key={checkin.id}>
      <Card
        sx={{
          borderRadius: 2,
          padding: 2,
          boxShadow: 3,
          position: "relative",
        }}
      >
        {/* CardMedia for the image */}
        <CardMedia
          component="img"
          image={checkin.image} 
          alt="checkin image"
          sx={{
            height: 200,
            borderRadius: 2,
            objectFit: "cover",
          }}
        />

        {/* Tag overlaying the image */}
        <Box
          sx={{
            position: "absolute",
            top: 30,
            right: 30,
            backgroundColor: "rgb(156, 39, 176)", // Semi-transparent background
            padding: "4px 8px",
            borderRadius: 4,
            color: "white",
          }}
        >
          <Typography variant="body2">Checked In</Typography>
        </Box>

        <CardContent>
          {/* CheckIn Details */}
          <Typography variant="h6" gutterBottom>
            {checkin.title} {/* Using the title property */}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {formattedDate} {/* Displaying the formatted date */}
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: 1 }}
          >
            <Avatar
              src="/path-to-avatar" // Placeholder avatar image
              sx={{ width: 24, height: 24, marginRight: 1 }}
            />
            <Typography variant="body2" color="textSecondary">
              Owner: {checkin.owner || 'Unknown'} {/* Placeholder for owner */}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
})}

        </Grid>
      </Box>
      <AddCheckInModal
        open={openModal}
        handleClose={handleCloseModal}
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
      />

    </Box>
  );
}
