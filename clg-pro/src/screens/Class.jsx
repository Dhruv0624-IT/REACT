import { IconButton } from "@mui/material";
import { SendOutlined } from "@mui/icons-material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import Announcement from "../components/Announcement";
import { auth, db } from "../firebase";
import "./Class.css";

function Class() {
  const [classData, setClassData] = useState({});
  const [announcementContent, setAnnouncementContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  const { id } = useParams();
  const navigate = useNavigate();

  // Reverse the posts array correctly
  useEffect(() => {
    let reversedArray = [...(classData?.posts || [])].reverse();
    setPosts(reversedArray);
  }, [classData]);

  const createPost = async () => {
    try {
      if (!announcementContent.trim()) {
        return; // Prevents posting empty announcements
      }

      // Get the document reference first
      const myClassRef = db.collection("classes").doc(id);
      
      // Fetch the data from the document
      const docSnapshot = await myClassRef.get();
      const myClassData = docSnapshot.data();

      let tempPosts = [...(myClassData.posts || [])];
      tempPosts.push({
        authorId: user.uid,
        content: announcementContent,
        date: moment().format("MMM Do YY"),
        image: user.photoURL,
        name: user.displayName,
      });

      // Update the document using the reference
      await myClassRef.update({
        posts: tempPosts,
      });

      setAnnouncementContent(""); // Clear the input field after posting
    } catch (error) {
      console.error(error);
      alert(`There was an error posting the announcement, please try again!`);
    }
  };

  useEffect(() => {
    const unsubscribe = db.collection("classes")
      .doc(id)
      .onSnapshot((snapshot) => {
        const data = snapshot.data();
        if (!data) {
          navigate("/", { replace: true });
        }
        setClassData(data);
      });
      
    // Return the unsubscribe function to clean up the listener
    return () => unsubscribe();
  }, [id, navigate]);

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/", { replace: true });
  }, [loading, user, navigate]);

  return (
    <div className="class">
      <div className="class__nameBox">
        <div className="class__name">{classData?.name}</div>
      </div>
      <div className="class__announce">
        <img src={user?.photoURL} alt="My image" />
        <input
          type="text"
          value={announcementContent}
          onChange={(e) => setAnnouncementContent(e.target.value)}
          placeholder="Announce something to your class"
        />
        <IconButton onClick={createPost}>
          <SendOutlined />
        </IconButton>
      </div>
      {posts?.map((post, index) => (
        <Announcement
          key={index} // Add a unique key prop
          authorId={post.authorId}
          content={post.content}
          date={post.date}
          image={post.image}
          name={post.name}
        />
      ))}
    </div>
  );
}

export default Class;