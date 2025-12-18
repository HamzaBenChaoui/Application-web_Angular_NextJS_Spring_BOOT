"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login as loginUser } from '../services/authService';

const AuthContext = createContext(null);

// Helper function to decode JWT
const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // On initial load, check for a user session in localStorage
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        const decodedToken = decodeJWT(userData.token);

        // Check if the token is expired
        if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
          setUser(userData);
          setIsLoggedIn(true);
        } else {
          // Clear expired token
          localStorage.removeItem('user');
        }
      }
      // Load favorites from localStorage
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Failed to load user or favorites from localStorage", error);
      localStorage.removeItem('user');
      localStorage.removeItem('favorites');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const loginResponse = await loginUser(email, password);

      if (loginResponse && loginResponse.jwt) {
        const decodedToken = decodeJWT(loginResponse.jwt);
        console.log("Decoded JWT Token for debugging:", decodedToken); // For debugging
        
        if (decodedToken) {
          let userName = decodedToken.nom;
          // If 'nom' is not present in the token, try to extract it from the email
          if (!userName && decodedToken.sub) {
            const emailParts = decodedToken.sub.split('@');
            if (emailParts[0]) {
              // Take the part before '@', replace dots/underscores with spaces, and capitalize each word
              userName = emailParts[0].replace(/[\._]/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            }
          }

          // Try to find user ID from common claims
          const userId = decodedToken.id || decodedToken.userId || decodedToken.user_id;
          console.log("Extracted User ID for debugging:", userId); // Log the extracted ID

          const userData = {
            id: userId, // Use the found ID
            token: loginResponse.jwt,
            nom: userName || decodedToken.sub, // Use extracted name or fallback to email
            email: decodedToken.sub, // 'sub' is standard for subject/email
          };
          
          localStorage.setItem('user', JSON.stringify(userData)); // Save to localStorage
          setUser(userData);

          setIsLoggedIn(true);
          router.push('/profile');
        }
      }
    } catch (error) {
      // Rethrow the error so the form can catch it
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user'); // Remove from localStorage
    setUser(null);
    setIsLoggedIn(false);
    // Après la déconnexion, rediriger vers la page d'accueil
    router.push('/');
  };

  const promptLogin = () => {
    // Rediriger vers la page de connexion quand une action requiert d'être connecté
    router.push('/login');
  };

  const addFavorite = (product) => {
    setFavorites(prevFavorites => {
      const newFavorites = [...prevFavorites, product];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const removeFavorite = (productId) => {
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.filter(p => p.id !== productId);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, login, logout, promptLogin, favorites, addFavorite, removeFavorite, clearFavorites }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
};