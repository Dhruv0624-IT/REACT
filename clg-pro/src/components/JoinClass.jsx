import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { auth, db } from "../firebase.js";
import { joinDialogAtom } from "../utils/atoms";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

function JoinClass() {
  const [open, setOpen] = useRecoilState(joinDialogAtom);
  const [user, loading, error] = useAuthState(auth);
  const [classId, setClassId] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const joinClass = async () => {
    try {
      // 1. Check if class exists
      const classRef = db.collection("classes").doc(classId);
      const classDoc = await classRef.get();
      if (!classDoc.exists) {
        return alert(`Class doesn't exist, please provide correct ID`);
      }
      const classData = classDoc.data();

      // 2. Find the user document
      const userRef = db.collection("users").where("uid", "==", user.uid);
      const userSnapshot = await userRef.get();
      // Check if user document exists
      if (userSnapshot.empty) {
        return alert("User not found in the database!");
      }

      // 3. Get user data and update enrolled classes
      const userDoc = userSnapshot.docs[0];
      const userData = userDoc.data();
      const tempClassrooms = [...userData.enrolledClassrooms]; // Use spread operator to create a new array
      
      // Prevent enrolling in the same class twice
      const alreadyEnrolled = tempClassrooms.some(classroom => classroom.id === classId);
      if (alreadyEnrolled) {
        return alert("You are already enrolled in this class.");
      }

      tempClassrooms.push({
        creatorName: classData.creatorName,
        creatorPhoto: classData.creatorPhoto,
        id: classId,
        name: classData.name,
      });

      // 4. Update the user document
      await userDoc.ref.update({
        enrolledClassrooms: tempClassrooms,
      });

      // 5. Success
      alert(`Enrolled in ${classData.name} successfully!`);
      handleClose();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="joinClass">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Join class</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter ID of the class to join the classroom
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Class Name"
            type="text"
            fullWidth
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={joinClass} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default JoinClass;