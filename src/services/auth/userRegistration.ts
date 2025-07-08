
import { toast } from "sonner";
import { MockUser, getRegisteredUsers, saveRegisteredUsers, getUserCount, setUserCount, MAX_REGISTRATION_USERS } from "./types";
import { isValidEmail, isValidPhone, isStrongPassword, sanitizeInput } from "@/utils/security";

export interface RegistrationData {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
}

export const canRegisterNewUser = (): boolean => {
  const currentCount = getUserCount();
  return currentCount < MAX_REGISTRATION_USERS;
};

export const getRemainingSlots = (): number => {
  const currentCount = getUserCount();
  return Math.max(0, MAX_REGISTRATION_USERS - currentCount);
};

export const registerUser = async (data: RegistrationData): Promise<boolean> => {
  try {
    // Check if registration is still available
    if (!canRegisterNewUser()) {
      toast.error("Registration is currently closed. We've reached our limit of 100 users.");
      return false;
    }

    // Validate inputs
    if (!data.fullName || !data.email || !data.mobile || !data.password) {
      toast.error("All fields are required");
      return false;
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(data.fullName.trim());
    const sanitizedEmail = sanitizeInput(data.email.trim().toLowerCase());
    const sanitizedMobile = sanitizeInput(data.mobile.trim());

    // Validate email
    if (!isValidEmail(sanitizedEmail)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // Validate phone
    if (!isValidPhone(sanitizedMobile)) {
      toast.error("Please enter a valid mobile number");
      return false;
    }

    // Validate password
    if (!isStrongPassword(data.password)) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }

    // Get existing users (both predefined and registered)
    const registeredUsers = getRegisteredUsers();
    const allUsers = [...registeredUsers];

    // Check if user already exists
    const existingUser = allUsers.find(user => 
      user.email.toLowerCase() === sanitizedEmail.toLowerCase()
    );

    if (existingUser) {
      toast.error("An account with this email already exists");
      return false;
    }

    // Create new user
    const newUser: MockUser = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2)}`,
      email: sanitizedEmail,
      password: data.password, // In a real app, this would be hashed
      name: sanitizedName,
      role: "user",
      mobile: sanitizedMobile
    };

    // Save user
    const updatedUsers = [...registeredUsers, newUser];
    saveRegisteredUsers(updatedUsers);

    // Update user count
    const newCount = getUserCount() + 1;
    setUserCount(newCount);

    console.log(`User registered successfully. Total users: ${newCount}/${MAX_REGISTRATION_USERS}`);
    
    toast.success("Account created successfully!");
    return true;
  } catch (error) {
    console.error("Registration error:", error);
    toast.error("An error occurred during registration. Please try again.");
    return false;
  }
};
