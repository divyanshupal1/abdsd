import mongoose ,{ Schema ,model,models} from "mongoose";

const studentSchema = new Schema(
    {
      avatar: {
        type: {
          url: String,
          localPath: String,
        },
        default: {
          url: `https://via.placeholder.com/200x200.png`,
          localPath: "",
        },
      },
      username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      role: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: [true, "Password is required"],
      },
      access_token: {
        type: String,
      },
    },
    { timestamps: true }
  );

  export const Student = models.Students || mongoose.model("Students", studentSchema);