import User from "../models/User.js";

/**
 * GET /api/profile/me
 * Returns the full profile of the authenticated user.
 */
export const getProfile = async (req, res) => {
  try {
    // req.user is attached by the protect middleware (no password field)
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name || "",
        email: user.email,
        studentId: user.studentId || "",
        course: user.course || "",
        year: user.year ?? null,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error.message);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * PUT /api/profile/me
 * Updates allowed profile fields: name, studentId, course, year.
 * Email and password cannot be changed through this endpoint.
 */
export const updateProfile = async (req, res) => {
  const { name, studentId, course, year } = req.body;

  // Build the update object — only include fields that were actually sent
  const updates = {};
  if (name !== undefined) updates.name = name.trim();
  if (studentId !== undefined) updates.studentId = studentId.trim();
  if (course !== undefined) updates.course = course.trim();
  if (year !== undefined) {
    const parsedYear = Number(year);
    if (!Number.isInteger(parsedYear) || parsedYear < 1 || parsedYear > 6) {
      return res
        .status(400)
        .json({ success: false, message: "Year must be an integer between 1 and 6." });
    }
    updates.year = parsedYear;
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ success: false, message: "No valid fields provided to update." });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        id: user._id,
        name: user.name || "",
        email: user.email,
        studentId: user.studentId || "",
        course: user.course || "",
        year: user.year ?? null,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error.message);

    // Handle duplicate studentId
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "Student ID already in use." });
    }

    return res.status(500).json({ success: false, message: "Server error." });
  }
};
