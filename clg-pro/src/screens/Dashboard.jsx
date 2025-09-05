  import React, { useEffect, useState } from "react";
  import "./Dashboard.css";
  import { useAuthState } from "react-firebase-hooks/auth";
  import { auth, db } from "../firebase";
  import { useNavigate } from "react-router-dom";
  import ClassCard from "../components/ClassCard";

  function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      if (loading) return;
      if (!user) {
        navigate("/", { replace: true });
        return;
      }

      const userQuery = db.collection("users").where("uid", "==", user.uid);

      const unsubscribe = userQuery.onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) {
          const userData = snapshot.docs[0].data();
          setClasses(userData.enrolledClassrooms);
        } else {
          // Handle case where user document is missing
          console.warn("User document not found in Firestore.");
          setClasses([]);
          // Optional: you could create a new user document here if you want
          // db.collection("users").doc(user.uid).set({ ... });
        }
      }, (err) => {
          console.error("Firestore snapshot error:", err);
      });

      return () => unsubscribe();
    }, [user, loading, navigate]);

    return (
      <div className="dashboard">
        {classes.length === 0 ? (
          <div className="dashboard__404">
            No classes found! Join or create one!
          </div>
        ) : (
          <div className="dashboard__classContainer">
            {classes.map((individualClass) => (
              <ClassCard
                key={individualClass.id}
                creatorName={individualClass.creatorName}
                creatorPhoto={individualClass.creatorPhoto}
                name={individualClass.name}
                id={individualClass.id}
                style={{ marginRight: 30, marginBottom: 30 }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  export default Dashboard;