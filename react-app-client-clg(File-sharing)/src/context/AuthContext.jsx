import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid'; // Make sure you have this installed: npm install uuid

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [userList, setUserList] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    if (!storedUsers) {
      const defaultUsers = [{
        id: uuidv4(), // Added unique ID
        email: "admin@example.com",
        password: "password",
        name: "Admin User",
        role: "Admin",
      }];
      localStorage.setItem("users", JSON.stringify(defaultUsers));
      return defaultUsers;
    }
    return JSON.parse(storedUsers);
  });

  const [fileList, setFileList] = useState(() => {
    const storedFiles = localStorage.getItem("files");
    return storedFiles ? JSON.parse(storedFiles) : [];
  });

  const [resetEmail, setResetEmail] = useState(null);
  const [otp, setOtp] = useState(null);

  useEffect(() => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(userList));
  }, [userList]);

  useEffect(() => {
    localStorage.setItem("files", JSON.stringify(fileList));
  }, [fileList]);

  const login = (email, password) => {
    const matchedUser = userList.find(
      (u) => u.email === email && u.password === password
    );

    if (matchedUser) {
      setUser(matchedUser);
      return matchedUser; // Return the user object on success
    }
    return null; // Return null on failure
  };

  const register = (email, password, name, role = "User") => {
    const userExists = userList.some(u => u.email === email);
    if (userExists) {
      toast.error("An account with this email already exists.");
      return null;
    }

    const newUser = { id: uuidv4(), email, password, name, role }; // Added unique ID
    setUserList(prev => [...prev, newUser]);
    toast.success("Registration successful!");
    setUser(newUser); // Automatically log in the new user
    return newUser; // Return the new user object
  };

  const logout = () => {
    setUser(null);
  };

  const updateFiles = (newFiles) => {
    setFileList(newFiles);
  };

  const setResetData = (email, generatedOtp) => {
    setResetEmail(email);
    setOtp(generatedOtp);
  };

  const resetPassword = (newPassword) => {
    if (!resetEmail) return false;

    const updatedUsers = userList.map(u => {
      if (u.email === resetEmail) {
        return { ...u, password: newPassword };
      }
      return u;
    });

    setUserList(updatedUsers);
    setResetEmail(null);
    setOtp(null);
    return true;
  };

  const value = {
    user,
    userList,
    fileList,
    login,
    register,
    logout,
    updateFiles,
    resetEmail,
    otp,
    setResetData,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);