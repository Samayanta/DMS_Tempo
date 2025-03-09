import React, { createContext, useContext, useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";

type UserRole = "retailer" | "admin";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  userRole: UserRole | null;
  retailerStatus: "pending" | "approved" | "rejected" | null;
  signIn: (
    identifier: string,
    password: string,
  ) => Promise<{
    error: Error | null;
    data: Session | null;
  }>;
  signUp: (
    email: string,
    password: string,
  ) => Promise<{
    error: Error | null;
    data: { user: User | null; session: Session | null };
  }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for development with a way to store registered users
const mockUsers = {
  retailer: {
    id: "retailer-user-id",
    email: "retailer@example.com",
    password: "retailer123",
    app_metadata: { role: "retailer" },
    user_metadata: { status: "approved" }, // Can be "pending", "approved", or "rejected"
    aud: "authenticated",
    created_at: new Date().toISOString(),
  },
  admin: {
    id: "admin-user-id",
    email: "admin@example.com",
    password: "admin123",
    app_metadata: { role: "admin" },
    user_metadata: {},
    aud: "authenticated",
    created_at: new Date().toISOString(),
  },
};

// Store registered users in localStorage to persist between sessions
const loadRegisteredUsers = () => {
  try {
    const storedUsers = localStorage.getItem("registeredUsers");
    return storedUsers ? JSON.parse(storedUsers) : {};
  } catch (error) {
    console.error("Failed to load registered users:", error);
    return {};
  }
};

const saveRegisteredUser = (email: string, userData: any) => {
  try {
    const registeredUsers = loadRegisteredUsers();
    registeredUsers[email] = userData;
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
  } catch (error) {
    console.error("Failed to save registered user:", error);
  }
};

// Mock session generator
const createMockSession = (user: any) => ({
  access_token: `mock-access-token-${user.id}`,
  refresh_token: `mock-refresh-token-${user.id}`,
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  token_type: "bearer",
  user,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [retailerStatus, setRetailerStatus] = useState<
    "pending" | "approved" | "rejected" | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading auth state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const signIn = async (identifier: string, password: string) => {
    // Check if it's the admin user
    if (
      identifier === mockUsers.admin.email &&
      password === mockUsers.admin.password
    ) {
      const adminUser = mockUsers.admin;
      const adminSession = createMockSession(adminUser);

      setUser(adminUser as unknown as User);
      setSession(adminSession as unknown as Session);
      setUserRole("admin");
      setRetailerStatus(null);

      return { data: adminSession as unknown as Session, error: null };
    }

    // Check if it's the default retailer user
    if (
      identifier === mockUsers.retailer.email &&
      password === mockUsers.retailer.password
    ) {
      const retailerUser = mockUsers.retailer;
      const retailerSession = createMockSession(retailerUser);

      setUser(retailerUser as unknown as User);
      setSession(retailerSession as unknown as Session);
      setUserRole("retailer");
      setRetailerStatus(retailerUser.user_metadata.status);

      return { data: retailerSession as unknown as Session, error: null };
    }

    // Check if it's a registered user from localStorage
    const registeredUsers = loadRegisteredUsers();
    const registeredUser = registeredUsers[identifier];

    if (registeredUser && registeredUser.password === password) {
      const userSession = createMockSession(registeredUser);

      setUser(registeredUser as unknown as User);
      setSession(userSession as unknown as Session);
      setUserRole("retailer");
      setRetailerStatus(registeredUser.user_metadata.status);

      return { data: userSession as unknown as Session, error: null };
    }

    // Simulate login error for invalid credentials
    return {
      data: null,
      error: new Error("Invalid login credentials") as Error,
    };
  };

  const signUp = async (
    email: string,
    password: string,
    businessName?: string,
  ) => {
    // Check if email is already registered
    const registeredUsers = loadRegisteredUsers();
    if (registeredUsers[email]) {
      return {
        data: { user: null, session: null },
        error: new Error("Email already registered") as Error,
      };
    }

    // Simulate successful registration as a retailer with pending status
    if (email && password) {
      const newRetailerUser = {
        id: `new-retailer-${Date.now()}`,
        email,
        password, // Store password for mock authentication
        app_metadata: { role: "retailer" },
        user_metadata: {
          status: "pending",
          businessName: businessName || "New Business",
        },
        aud: "authenticated",
        created_at: new Date().toISOString(),
      };

      // Save the new user to localStorage
      saveRegisteredUser(email, newRetailerUser);

      const newRetailerSession = createMockSession(newRetailerUser);

      setUser(newRetailerUser as unknown as User);
      setSession(newRetailerSession as unknown as Session);
      setUserRole("retailer");
      setRetailerStatus("pending");

      return {
        data: {
          user: newRetailerUser as unknown as User,
          session: newRetailerSession as unknown as Session,
        },
        error: null,
      };
    }

    // Simulate registration error
    return {
      data: { user: null, session: null },
      error: new Error("Registration failed") as Error,
    };
  };

  const signOut = async () => {
    // Simulate logout
    setUser(null);
    setSession(null);
    setUserRole(null);
    setRetailerStatus(null);
  };

  const value = {
    session,
    user,
    loading,
    userRole,
    retailerStatus,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
